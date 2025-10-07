const express = require('express')
const Recipe = require('../models/recipe')
const jwt = require('jsonwebtoken')
const recipesRouter = express.Router()
const User = require('../models/user')
const middleware = require('../utils/middleware')

recipesRouter.get('/recent', async (request, response) => {
  try {
    const recipes = await Recipe.find({})
        .sort({ createdAt: -1 })
        .limit(3)
    response.json(recipes)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: error.message })
  }
})

recipesRouter.get('/:id', async (request, response) => {
  const recipe = await Recipe.findById(request.params.id)
      .populate('user', { username: 1 })
      .populate('likedBy', { username: 1 })

  if (!recipe) return response.status(404).json({ error: 'Reseptiä ei löytynyt'})
  response.json(recipe)
})

recipesRouter.get('/', async (request, response) => {
  const recipes = await Recipe.find({})
      .populate('user', { username: 1 })      // kuka lisäsi reseptin
      .populate('likedBy', { username: 1 })   // ketkä ovat tykänneet
  response.json(recipes)
})

recipesRouter.post('/', middleware.authenticateUser, async (request, response) => {
  const body = request.body
  const user = request.user

  const recipe = new Recipe({
    title: body.title,
    ingredients: body.ingredients,
    instructions: body.instructions,
    category: body.category,
    image: body.image,
    user: user._id,
    likes: 0,
    likedBy: []
  })

  const savedRecipe = await recipe.save()
  user.recipes = user.recipes.concat(savedRecipe._id)
  await user.save()

  response.status(201).json(savedRecipe)
})

recipesRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  //let imageUrl = body.image

  const updatedData = {
    title: body.title,
    ingredients: body.ingredients,
    instructions: body.instructions,
    category: body.category, 
    image: body.image,
    likes: body.likes
  }

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(request.params.id, updatedData, { new: true })
    response.json(updatedRecipe)
  } catch (error) {
    next(error)
  }
})

recipesRouter.put('/:id/like', middleware.authenticateUser, async (request, response, next) => {
  try {
    const recipe = await Recipe.findById(request.params.id)
    if (!recipe) return response.status(404).json({ error: 'Reseptiä ei löytynyt' })

    const userId = request.user.id.toString()
    const user = await User.findById(userId)
    if (recipe.likedBy.map(id => id.toString()).includes(userId)) {
      return response.status(400).json({ error: 'Olet jo tykännyt tästä reseptistä' })
    }

    recipe.likes = (recipe.likes || 0) + 1
    recipe.likedBy.push(userId)
    await recipe.save()

    if (!user.likedRecipes.includes(recipe._id)) {
      user.likedRecipes.push(recipe._id)
      await user.save()
    }

    response.json(recipe)
  } catch (error) {
    next(error)
  }
})

recipesRouter.delete('/:id', middleware.authenticateUser, async (request, response) => {
  const recipe = await Recipe.findById(request.params.id)

  if (!recipe) {
    return response.status(404).json({ error: 'recipe not found' })
  }

  if (recipe.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'you can only delete your own recipes' })
  }

  await Recipe.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


module.exports = recipesRouter