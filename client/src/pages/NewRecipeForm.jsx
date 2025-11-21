import React, { useState, useRef } from 'react'
import axios from 'axios'
import recipeService from '../services/recipes.js'
import {Card, Form, Button} from "react-bootstrap"

const NewRecipeForm = () => {
    const [title, setTitle] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [instructions, setInstructions] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const fileInputRef = useRef(null)

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
                setErrorMessage('Kuvan lisäys epäonnistui!')
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
        setImage(null)
            alert('Resepti lisätty onnistuneesti!')
        } catch (err) {
            console.error('Reseptin tallennus epäonnistui:', err)
            alert('Reseptin tallennus epäonnistui!')
        }
        fileInputRef.current.value = "";
    }

  return (
      <main className="navbar nav2 w-flex justify-content-center">
          <Card className="p-4 shadow-sm" style={{ maxWidth: "800px", width: "100%", borderRadius: "1rem", border: "solid #CB0E40FF" }}>
              <h3 className="text-center mb-4 dark font-monospace">Lisää resepti</h3>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="title">
                      <Form.Label> Otsikko </Form.Label>
                      <textarea
                          rows={1}
                          name="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          maxLength={50}
                          className="border p-2 rounded text-center w-100"
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="category">
                      <Form.Label>Kategoria</Form.Label>
                      <textarea
                          rows={1}
                          name="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                          maxLength={20}
                          className="border p-2 rounded text-center w-100"
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="image">
                      <Form.Label>Kuva</Form.Label>
                      <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          //capture="environment"
                          className="border p-2 rounded text-center w-100"
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
                      <textarea
                          rows={4}
                          name="ingredients"
                          value={ingredients}
                          onChange={(e) => setIngredients(e.target.value)}
                          required
                          maxLength={300}
                          className="border p-2 rounded text-center w-100"
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="instructions">
                      <Form.Label>Valmistusohje</Form.Label>
                      <textarea
                          rows={6}
                          name="instructions"
                          value={instructions}
                          onChange={(e) => setInstructions(e.target.value)}
                          required
                          maxLength={1000}
                          className="mb-3 border p-2 rounded text-center w-100"
                      />
                  </Form.Group>

                  <Button
                      type="submit"
                      className="w-100 my-button"
                  >
                      LISÄÄ RESEPTI
                  </Button>
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </Form>
          </Card>
      </main>
  )
}

export default NewRecipeForm
