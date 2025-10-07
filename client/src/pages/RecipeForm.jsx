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
        <div className="nav2 p-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 mt-4">{recipe.title}</h2>
          <p className="text-sm text-gray-600 mb-2">Kategoria: {recipe.category}</p>
          {recipe.image ? (
              <img
                  src={recipe.image || 'https://via.placeholder.com/150'}
                  alt={recipe.title}
                  className="resepti-kuva"
              />
          ) : (
              <p className="text-gray-500 italic">Ei kuvaa</p>
          )}
            <h3 className="text-xl font-semibold mb-2">Ainekset</h3>
            <p className="mb-4 whitespace-pre-line">{recipe.ingredients}</p>
            <h3 className="text-xl font-semibold mb-2">Valmistusohje</h3>
            <p className="whitespace-pre-line">{recipe.instructions}</p>

            {user && recipe.user && recipe.user.username === user.username && (
                <button
                    onClick={handleDelete}
                    className="delete-button mb-4"
                    style={{position: 'relative' }}
                >
                    Poista resepti
                </button>
            )}
        </div>
    )
}

export default RecipeForm