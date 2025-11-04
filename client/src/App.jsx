import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import recipeService from './services/recipes'
import loginService from './services/login'
import userService from './services/users'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import LoginForm from './pages/LoginForm'
import RecipeForm from './pages/RecipeForm.jsx'
import Navbar from './pages/Navbar'
import HomePage from './pages/HomePage'
import Profile from "./pages/Profile.jsx"
import ContactPage from "./pages/ContactPage.jsx"
import AllRecipes from './pages/AllRecipes'
import NewRecipeForm from "./pages/NewRecipeForm.jsx"
import Notification from "./components/Notification.jsx";

import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', instructions: '' })
  const [notification, setNotification] = useState({ message: null, type: null })

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: null }), 4000)
  }

  useEffect(() => {
    recipeService.getAllRecipes().then(data => setRecipes(data))
  }, [user])

  const handleLogin = async (username, password) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      setUser(loggedUser)
      userService.setToken(loggedUser.token)
      recipeService.setToken(loggedUser.token)
      window.localStorage.setItem('loggedRecipeappUser', JSON.stringify(loggedUser))
      console.log('Käyttäjä tallennettu localStorageen:', loggedUser)
    } catch (error) {
      console.error(error)
      showNotification('Käyttäjätunnus tai salasana ei täsmää :(', 'error')
    }
  }

  const handleAddRecipe = async (e) => {
    e.preventDefault()
    try{
      const added = await recipeService.createRecipe({ ...newRecipe, userId: user.id })
      setRecipes([...recipes, added])
      setNewRecipe({ name: '', ingredients: '', instructions: '', category: '', image: '', likes: '' })
      showNotification('Resepti lisätty onnistuneesti', 'success')
    } catch (error) {
      console.error(error)
      showNotification('Virhe reseptin lisäämisessä', 'error')
    }
  }

 return (
    <Router>
      <div className="">
        <Notification message={notification.message} type={notification.type}/>

        <Navbar user={user} setUser={setUser} showNotification={showNotification}/>

        <Routes>
          <Route path="/" element={<Navigate to="/recent"/>}/>
          <Route path="/recent" element={<HomePage user={user}/>}/>

          <Route
              path="/recipes"
              element={
                <AllRecipes
                    recipes={recipes}
                    onAddRecipe={handleAddRecipe}
                    user={user}
                />
              }
          />

          <Route
              path="/recipes/:id"
              element={<RecipeForm user={user}/>}
          />

          <Route
              path="/new-recipe"
              element={<NewRecipeForm/>}
          />

          <Route
              path="/contact"
              element={<ContactPage/>}
          />

          <Route
              path="/login"
              element={
                <LoginForm
                    setUser={setUser}
                    showNotification={showNotification}
                    onLogin={handleLogin}
                />
              }
          />
          <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <Profile user={user}/>
                </ProtectedRoute>
              }
          />
        </Routes>
        <div>
          <p className="navbar" style={{color: "white", paddingTop: "20px", justifyContent: "center" }}>
            Reseptisovellus, tietojenkäsittelytieteen laitos 2025
          </p>
        </div>
      </div>
    </Router>
 )
}

export default App

