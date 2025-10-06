const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const Recipe = require('../models/recipe')
const User = require('../models/user')
const helper = require('./test_helper')

let token = null

beforeEach(async () => {
  await User.deleteMany({})
  await Recipe.deleteMany({})

  const passwordHash = await bcrypt.hash('salasana', 10)
  const user = new User({ username: 'matti@testi.com', passwordHash })
  const savedUser = await user.save()

  // Login to get token
  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'matti@testi.com', password: 'salasana' })

  token = loginResponse.body.token

  const recipe = new Recipe({
      title: 'Leipä', 
      ingredients: 'jauho, suola, vesi',
      instruction: 'kaada kaikki kulhoon ja sekoita, pyöritä pallo ja paista uunissa',
      category: 'Suolaiset leivonnaiset',
      likes: 2,
      user: savedUser._id
  })

  await recipe.save()
})

test('reseptit palautetaan JSONina', async () => {
  await api
    .get('/api/recipes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('resepti voidaan lisätä oikeilla tiedoilla', async () => {
  const newRecipe = {
    name: 'Pastakastike',
    ingredients: 'kerma, tomaatti',
    instructions: 'sekoita ja keitä'
  }

  await api
    .post('/api/recipes')
    .set('Authorization', `Bearer ${token}`)
    .send(newRecipe)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const recipesAtEnd = await Recipe.find({})
  const names = recipesAtEnd.map(r => r.name)
  expect(names).toContain('Pastakastike')
})

test('tykkäys onnistuu', async () => {
  const recipes = await Recipe.find({})
  const recipeToLike = recipes[0]

  const updated = {
    ...recipeToLike.toJSON(),
    likes: recipeToLike.likes + 1
  }

  const response = await api
    .put(`/api/recipes/${recipeToLike._id}`)
    .send(updated)
    .expect(200)

  expect(response.body.likes).toBe(recipeToLike.likes + 1)
})

test('oma resepti voidaan poistaa', async () => {
  const recipesAtStart = await Recipe.find({})
  const recipeToDelete = recipesAtStart[0]

  await api
    .delete(`/api/recipes/${recipeToDelete._id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const recipesAtEnd = await Recipe.find({})
  expect(recipesAtEnd).toHaveLength(recipesAtStart.length - 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})
