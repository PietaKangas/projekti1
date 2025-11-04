const Recipe = require('../models/recipe')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
 
const initialRecipes = [
  {
    title: 'Kakku', 
    ingredients: 'jauho, sokeri, vesi',
    instruction: 'kaada kaikki kulhoon ja sekoita, paista uunissa',
    category: 'Makeat leivonnaiset',
    likes: 10
  },
  {
    title: 'Leipä', 
    ingredients: 'jauho, suola, vesi',
    instruction: 'kaada kaikki kulhoon ja sekoita, pyöritä pallo ja paista uunissa',
    category: 'Suolaiset leivonnaiset',
    likes: 2
  }
]
const initialUsers = [
  { name: 'Matti', username: 'matti@testi.com', passwordHash: 'salasana', isAdmin: true},
  { name: 'Kaisa', username: 'kaisa@testi.com', passwordHash: 'salainen12345', isAdmin: false},
]

const loginUser = async (api) => {
  const loginResponse = await api
    .post('/api/login')
    .send({
      username: 'matti@testi.com',
      password: 'salasana',
    })
    if (!loginResponse.body.token) {
      throw new Error('Login failed')
    }
    return loginResponse.body.token
  }
  

const nonExistingId = async () => {
  const recipe = new Recipe({ 
    title: 'Kakku', 
    ingredients: 'jauho, sokeri, vesi',
    instruction: 'kaada kaikki kulhoon ja sekoita, paista uunissa',
    category: 'Makeat leivonnaiset',
    likes: 10
})
  await recipe.save()
  const id = recipe._id.toString()
  await recipe.deleteOne()

  return id
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const recipesInDb = async () => {
  const recipes = await Recipe.find({})
  return recipes.map(recipe => recipe.toJSON())
}


const initializeDatabase = async () => {
  await User.deleteMany({})
  await Recipe.deleteMany({})

  // Luodaan testikäyttäjät ja reseptit
  for (let user of initialUsers) {
    const passwordHash = await require('bcrypt').hash(user.passwordHash, 10)
    const newUser = new User({
      name: user.name,
      username: user.username,
      passwordHash,
      isAdmin: user.isAdmin,
    })
    await newUser.save()
  }

  for (let recipe of initialRecipes) {
    const newRecipe = new Recipe(recipe)
    await newRecipe.save()
  }
}

module.exports = {
  initialRecipes, initialUsers, loginUser, nonExistingId, recipesInDb, usersInDb
}