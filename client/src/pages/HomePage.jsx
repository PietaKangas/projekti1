import React, { useState, useEffect } from 'react'
import recipeService from '../services/recipes'

const HomePage = ({ user }) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        recipeService.getAllRecipes().then(data => setRecipes(data))
      }, [])


      return (
        <div>
          <section className="text-center p-4 ">
              <h1 style={{ fontSize: '1.3rem', fontWeight: 'initial', fontFamily: 'monospace', color: '#ge1e3a'}}>
                  Täällä voit inspiroitua muiden resepteistä ja halutessasi lisätä omia reseptejä
              </h1>
          </section>
    
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {/* Reseptit näkyviin */}
            {recipes.slice(0, 9).map(recipe => (
          <div key={recipe._id || recipe.id} className="border p-4 bg-blue-800">
            {/* Kuvan ja otsikon näyttäminen */}
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
            ))}

              {!user && (
                  <p className="mt-4 text-sm punainen-teksi text-center col-span-full">
                      Kirjaudu sisään, jotta voit lisätä omia reseptejä ja tykätä suosikeistasi
                  </p>
              )}
          </section>
        </div>
      )
}

export default HomePage