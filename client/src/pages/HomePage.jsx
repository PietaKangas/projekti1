import React, { useState, useEffect } from 'react'
import recipeService from '../services/recipes'

const HomePage = ({ user }) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        recipeService.getRecent()
            .then(data => {
                console.log('Recent recipes:', data)
                setRecipes(data)
            })
            .catch(err => console.error('Virhe uusien reseptien haussa:', err))
            }, [])


      return (
        <div>
            <nav className="custom-nav border text-center p-4">
                <h1 style={{fontSize: '1.3rem', fontWeight: 'initial', fontFamily: 'monospace', marginBottom: '2rem'}}>
                    Täällä voit inspiroitua muiden resepteistä ja halutessasi lisätä omia reseptejä
                </h1>
                <h2 style={{textAlign: 'left', fontSize: '1.0rem', fontWeight: 'initial', fontFamily: 'monospace'}}>
                    Uusimmat reseptit
                </h2>
            </nav>

            <nav className="custom-nav border grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                {Array.isArray(recipes) ? recipes.slice(0, 3).map(recipe => (
                    <div key={recipe._id || recipe.id} className="border p-4 bg-blue-800 nav2">

            {recipe.image && (
                <img
                    src={recipe.image || 'https://via.placeholder.com/150'}
                    alt={recipe.title}
                    className="resepti-kuva"
                />
            )}
              <h3 className="text-lg font-bold">{recipe.title}</h3>
              <p className="text-sm text-gray-700">{recipe.ingredients}</p>
              <p className="mt-2">{recipe.instructions}</p>
          </div>
            )) : null}

              {!user && (
                  <p className="mt-4 text-sm punainen-teksi text-center col-span-full">
                      Kirjaudu sisään, jotta voit lisätä omia reseptejä ja tykätä suosikeistasi
                  </p>
              )}
          </nav>
        </div>
      )
}

export default HomePage