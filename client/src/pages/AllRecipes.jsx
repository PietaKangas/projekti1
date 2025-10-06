import React, { useState, useEffect } from 'react'
import recipeService from '../services/recipes'
import FilterRecipes from "./FilterRecipes.jsx";

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
            setRecipes(recipes.map(r => r.id === recipeId ? updatedRecipe : r))
        } catch (error) {
            console.error(error.response?.data?.error || 'Virhe tykkäyksessä')
            alert(error.response?.data?.error || 'Virhe tykkäyksessä')
        }
    }

    return (
        <div className="p-6">
            <section className="text-center p-4 ">
                <h1 style={{fontSize: '1.3rem', fontWeight: 'initial', fontFamily: 'monospace', color: '#d38c42'}}>
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