/*const express = require('express')
const Recipe = require('../models/recipe')
const User = require('../models/user')
const router = express.Router()

// Lisää uusi resepti
router.post('/', async (req, res) => {
  const { title, ingredients, instructions, category, userId } = req.body

  const user = await User.findById(userId)

  if (!user) {
    return res.status(400).json({ error: 'User not found' })
  }

  const recipe = new Recipe({
    title,
    ingredients,
    instructions,
    category,
    likes: 0,
    user: user._id,
  })

  try {
    const savedRecipe = await recipe.save()
    res.status(201).json(savedRecipe)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
*/