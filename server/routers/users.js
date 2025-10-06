/*const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')

// Lisää uusi käyttäjä
router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
*/