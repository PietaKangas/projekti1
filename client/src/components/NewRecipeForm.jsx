import React, { useState } from 'react'
import axios from 'axios'
import recipeService from '../services/recipes'
import {Container, Card, Form, Button} from "react-bootstrap"

const NewRecipeForm = () => {
    const [title, setTitle] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const uploadImage = async (file) => {
        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'recipe_images')

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/db3v2dkr5/image/upload', formData)
            setUploading(false)
            return response.data.secure_url
        } catch (error) {
            setUploading(false)
            if (error.response && error.response.data) {
                alert(`Cloudinary Error: ${JSON.stringify(error.response.data)}`)
            } else {
                setErrorMessage('Image upload failed!')
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let imageUrl = ''
        if (image) {
            imageUrl = await uploadImage(image)
        }
        try {
            const newRecipe = {
                title,
                ingredients,
                instructions,
                category,
                image: imageUrl,
            }

        const savedRecipe = await recipeService.createRecipe(newRecipe)
        console.log('Resepti tallennettu:', savedRecipe)

        setTitle('')
        setIngredients('')
        setInstructions('')
        setCategory('')
        setImage('')
            alert('Resepti lisätty onnistuneesti!')
        } catch (err) {
            console.error('Reseptin tallennus epäonnistui:', err)
            alert('Reseptin tallennus epäonnistui!')
        }
    }

  return (
      <Container className="d-flex justify-content-center mt-5">
          <Card className="p-4 shadow-sm" style={{ maxWidth: "600px", width: "100%" }}>
              <h3 className="text-center mb-4 dark font-monospace">LISÄÄ RESEPTI</h3>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="title">
                      <Form.Label>Otsikko</Form.Label>
                      <Form.Control
                          type="text"
                          name="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-100"
                      />
                  </Form.Group>


                  <Form.Group className="mb-3" controlId="category">
                      <Form.Label>Kategoria</Form.Label>
                      <Form.Control
                          type="text"
                          name="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-100"
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="image">
                      <Form.Label>Kuva</Form.Label>
                      <Form.Control
                          type="file"
                          name="image/*"
                          capture="environment"
                          onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                  setImage(e.target.files[0])
                              }
                          }}
                      />
                      {uploading && <p>Uploading image...</p>}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="ingredients">
                      <Form.Label>Ainekset</Form.Label>
                      <Form.Control
                          as="textarea"
                          rows={4}
                          name="ingredients"
                          value={ingredients}
                          onChange={(e) => setIngredients(e.target.value)}
                          className="w-100"
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="instructions">
                      <Form.Label>Valmistusohje</Form.Label>
                      <Form.Control
                          as="textarea"
                          rows={6}
                          name="instructions"
                          value={instructions}
                          onChange={(e) => setInstructions(e.target.value)}
                          className="w-100"
                      />
                  </Form.Group>

                  <Button
                      type="submit"
                      className="w-100"
                      style={{ backgroundColor: "#262fd6"}}
                  >
                      LISÄÄ RESEPTI
                  </Button>
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </Form>
          </Card>
      </Container>
  )
}

export default NewRecipeForm
