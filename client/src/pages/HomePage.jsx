import React, { useState, useEffect } from 'react'
import recipeService from '../services/recipes'

const HomePage = ({ user }) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        recipeService.getRecent()
            .then(data => {
                //console.log('Recent recipes:', data)
                setRecipes(data)
            })
            .catch(err => console.error('Virhe uusien reseptien haussa:', err))
            }, [])


      return (
          <main>
              <nav className="text-center p-2">
                  <h1 style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      color: 'black',
                      marginTop: '5rem',
                      marginBottom: '4rem'
                  }}>
                      Tervetuloa reseptisovellukseen!
                  </h1>
              </nav>

              <div className="navbar2">
                  <h2 style={{
                      flexBasis: '50%',
                      paddingRight: '1rem',
                      fontSize: '1.5rem',
                      fontWeight: "initial",
                      fontFamily: 'monospace',
                      marginTop: '3rem',
                      marginBottom: '3rem'
                  }}>
                      Täällä voit selata muiden lisäämiä reseptejä.<br/>
                      <br/>
                      Rekisteröidy käyttäjäksi ja kirjaudu sisään, niin voit itse lisätä omia reseptejä sekä tykätä
                      suosikeistasi.
                  </h2>
                  <div className="raita-container">
                  </div>
              </div>

              <div className="text-left p-4">
                  <h2 style={{
                      paddingLeft: '1rem',
                      fontSize: '1.5rem',
                      fontWeight: "bold",
                      fontFamily: 'monospace',
                      marginTop: '3rem',
                      marginBottom: '2rem',
                      textAlign: 'left'
                  }}>
                      Uusimmat reseptit
                  </h2>
              </div>

              <div className="recipes text-center p-4">
                  {Array.isArray(recipes) ? recipes.slice(0, 3).map(recipe => (
                      <div key={recipe._id || recipe.id} className="p-4 custom-nav cloud mb-3 mt-4">

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
                      <p className="mt-5 mb-5 mb-1 text-sm punainen-teksi text-center col-span-full">
                          Kirjaudu sisään, jotta voit lisätä omia reseptejä.
                      </p>
                  )}
              </div>
          </main>
      )
}

export default HomePage