const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const middleware = require("../utils/middleware")

const usersRouter = express.Router()

usersRouter.post('/', async (request, response) => {
  try{
    const { name, username, password } = request.body

    if (!name || !username || !password) {
      return response.status(400).json({ error: 'Kaikki kentät ovat ovat pakollisia' })
    }
    else if (!password || password.length < 7) {
      return response.status(400).json({ error: 'Salasana on liian lyhyt' })
    }
  
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({ error: 'Käyttäjänimi on jo varattu' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({ name, username, passwordHash, recipes: [], likedRecipes: []})

    const savedUser = await user.save()

      response.status(201).json({
        id: savedUser._id,
        username: savedUser.username,
        name: savedUser.name,
        recipes: savedUser.recipes,
        likedRecipes: savedUser.likedRecipes
      })
      
  } catch (error) {
    response.status(500).json({ error: 'Virhe käyttäjän luomisessa' })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('recipes', { title: 1 })
  response.json(users)
})

usersRouter.get('/profile', middleware.authenticateUser, async (request, response) => {
  try {
    console.log('request.user:', request.user)

    const user = await User.findById(request.user.id)
        .populate('recipes')   
        .populate('likedRecipes') 
    if (!user) return response.status(404).json({ error: 'Käyttäjää ei löytynyt' })
    response.json(user)
  } catch (error) {
    console.error('Profiilin hakuvirhe:', error)

    response.status(500).json({ error: error.message })
  }
})

usersRouter.delete('/profile', middleware.authenticateUser, async (request, response) => {
  try {
    await User.findByIdAndDelete(request.user.id)
    response.json({ message: 'tili poistettu onnistuneesti' })
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

module.exports = usersRouter

