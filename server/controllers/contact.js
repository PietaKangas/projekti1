import express from 'express'
import cors from 'cors'
const Contact = require('../models/contact')

const contactRouter = express.Router()
contactRouter.use(cors())
contactRouter.use(express.json())

contactRouter.get('/api/contact', async (request, response) => {
    try {
        const contact = await Contact.find({})
        response.json(contact)
    } catch (error) {
        next(error)
    }
})
contactRouter.post('/api/contact', async (request, response) => {
    const { name, category, subject, message } = request.body
    const userEmail = request.user?.email || 'Tuntematon'
    if (!subject || !message) {
        return response.status(400).json({message: 'Aihe ja viesti ovat pakollisia'})
    }

    try {
        const newMessage = new Contact({
            name,
            email: userEmail,
            category,
            subject,
            message,
        })
        await newMessage.save()
        response.status(201).json({ message: 'Message received and saved successfully!' })
    } catch (error) {
        console.error('Error saving message to database:', error)
        response.status(500).json({ message: 'Failed to save the message. Please try again later.' })
    }
})

contactRouter.delete('/:id', async (request, response) => {
    try {
        await Contact.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = contactRouter