import React, { useState } from 'react'
import axios from 'axios'
import {Container, Button, Card, Form} from "react-bootstrap"

const ContactForm = () => {
    const [category, setCategory] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('topic', category)
        formData.append('title', subject)
        formData.append('message', message)

        try {
            await axios.post('http://localhost:3001/api/contact', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            setStatus('Viesti lähetetty onnistuneesti!')
            setCategory('')
            setSubject('')
            setMessage('')
        } catch (error) {
            console.error(error)
            setStatus('Viestiä ei voitu lähettä, yritä myöhemmin uudelleen.')
        }
    }

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Card className="p-4 shadow-sm" style={{maxWidth: "600px", width: "100%"}}>
                <h3 className="text-center mb-4 dark font-monospace">
                    OTA YHTEYTTÄ
                </h3>
                    <div className="mb-4"></div>
                    <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            className="w-100 h-40"
                        >
                            <option value="">Valitse aihe</option>
                            <option value="Ongelma nettisivulla">Bug report</option>
                            <option value="Tekniikka apu">Technical support</option>
                            <option value="Palaute">Feedback</option>
                            <option value="">General Inquiry</option>
                            <option value="Muu">Other</option>
                        </select>
                        <div className="mb-2"></div>
                        <input
                            type="text"
                            placeholder="Otsikko"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            className="w-100"
                        />
                        <div className="mb-2"></div>
                        <textarea
                            placeholder="Viesti"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="w-100"
                            rows={5}
                        />
                        <div className="mb-2"></div>
                        <Button
                            type="submit"
                            className="w-100"
                            style={{backgroundColor: "#262fd6"}}
                        >
                            LÄHETÄ
                        </Button>
                    </Form>
                    {status && <p className="mt-4">{status}</p>}
                    <div className="mb-4"></div>
            </Card>
        </Container>
)
}
export default ContactForm
