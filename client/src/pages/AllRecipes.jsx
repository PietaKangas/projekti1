import React, { useState, useEffect } from 'react'
import recipeService from '../services/recipes'
import FilterRecipes from "./FilterRecipes.jsx"

const AllRecipesPage = () => {
    const [recipes, setRecipes] = useState([])
    const [search, setSearch] = useState("")
    const [user] = useState(JSON.parse(localStorage.getItem('loggedRecipeappUser')))

    useEffect(() => {
        recipeService.getAllRecipes().then(data => {
            console.log('Haetut reseptit:', data)
            setRecipes(data)
        })
    }, [])

    useEffect(() => {
        console.log('Kirjautunut käyttäjä localStoragessa:', user)
    }, [user])

    const handleLike = async (recipeId) => {
        try {
            console.log('Tykkäys lähetetty reseptille id:', recipeId)
            const updatedRecipe = await recipeService.likeRecipe(recipeId)
            console.log('Päivitetty resepti:', updatedRecipe)
            setRecipes((recipes) =>
                recipes.map((r) =>
                    r.id === recipeId
                        ? {
                            ...r,
                            likes: (r.likes || 0) + 1,
                            likedBy: [...(r.likedBy || []), user.id],
                        }
                        : r
                    )
                )
        } catch (error) {
            if (error.response?.data?.error === "Olet jo tykännyt tästä reseptistä") {
                alert("Olet jo tykännyt tästä reseptistä ❤️")
            } else {
                console.error(error.response?.data?.error || 'Virhe tykkäyksessä')
                alert(error.response?.data?.error || 'Virhe tykkäyksessä')
            }
        }
    }

    return (
        <div className="nav2 p-6 mx-auto">
            <section className="text-center p-4">
                <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace', color: '#000000'}}>
                    Kaikki reseptit
                </h1>
            </section>

            <FilterRecipes
                recipes={recipes}
                search={search}
                setSearch={setSearch}
                user={user}
                handleLike={handleLike}
            />
        </div>
    )
}

export default AllRecipesPage