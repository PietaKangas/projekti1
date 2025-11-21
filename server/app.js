require('dotenv').config()
const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const path = require('path')
const cors = require('cors')

const usersRouter = require('./controllers/users')
const recipesRouter = require('./controllers/recipes')
const loginRouter = require('./controllers/login')
const contactRouter = require('./controllers/contact')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


app.use(cors())
app.use(express.json())

// API-reitit
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/recipes', recipesRouter)
app.use('/api/contact', contactRouter)

app.use(express.static(path.join(__dirname, '../client/dist')))

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.requestLogger)

module.exports = app