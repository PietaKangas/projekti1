const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({username})
  const correct = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!correct) {
    return response.status(401).json({ error: 'Väärä käyttäjätunnus tai salasana :(' })
  }

  console.log('SECRET käytössä:', process.env.SECRET)
  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET,
  )
  
  response.status(200).json({ token, id: user._id, username: user.username })
})

module.exports = loginRouter
