import React, { useState, useEffect } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import recipeService from '../services/recipes.js'

const RecipeForm = ({user}) => {
    const {id} = useParams()
    const [recipe, setRecipe] = useState(null)
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    useEffect(() => {
        recipeService.getRecipeById(id).then(data => setRecipe(data))
    }, [id])

    const handleDelete = async () => {
        if (window.confirm("Haluatko varmasti poistaa reseptin?")) {
            try {
                await recipeService.deleteRecipe(id, user.token)
                navigate('/profile')
            } catch (err) {
                console.error("Reseptin poistaminen epäonnistui:", err)
                setError("Poisto epäonnistui")
            }
        }
    }

    if (error) return <div className="p-6 text-red-600">{error}</div>
    if (!recipe) return <div className="p-6">Ladataan reseptiä...</div>

    return (
        <div className="recipe-profile-page flex flex-col p-6">
            {recipe.image ? (
                <img
                    src={recipe.image || 'https://via.placeholder.com/150'}
                    alt={recipe.title}
                    className="resepti-kuva2"
                />
            ) : (
                <p></p>
            )}
            <h1 className="mb-4 mt-4" style={{color: "#CB0E40FF"}}>{recipe.title}</h1>
            <p className="mb-4">Kategoria: {recipe.category}</p>
            <h3 className="mb-2 mt-4">Ainekset</h3>
            <p className="mb-4" style={{ whiteSpace: 'pre-line' }}>{recipe.ingredients}</p>
            <h3 className="mb-2 mt-4">Valmistusohje</h3>
            <p className="mb-4" style={{ whiteSpace: 'pre-line' }}>{recipe.instructions}</p>

            {user && recipe.user && recipe.user.username === user.username && (
                <button
                    onClick={handleDelete}
                    className="delete-button mt-4"
                    style={{position: 'relative' }}
                >
                    Poista resepti
                </button>
            )}
        </div>
    )
}

export default RecipeForm