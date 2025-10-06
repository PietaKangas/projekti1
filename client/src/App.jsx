import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import recipeService from './services/recipes'
import loginService from './services/login'
import userService from './services/users'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Togglable from './components/Togglable'
import LoginForm from './pages/LoginForm'
import RecipeForm from './pages/RecipeForm.jsx'
import Navbar from './pages/Navbar'
import HomePage from './pages/HomePage'
import Profile from "./pages/Profile.jsx"
import ContactPage from "./pages/ContactPage.jsx"
import FilterRecipes from './pages/FilterRecipes'
import AllRecipes from './pages/AllRecipes'
import NewRecipeForm from "./components/NewRecipeForm.jsx"
import Notification from "./components/Notification.jsx";

import './App.css'

function App() {
  const [user, setUser] = useState(null)
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  //const [loginVisible, setLoginVisible] = useState(false)
  const [recipes, setRecipes] = useState([])
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: '', instructions: '' })
  //const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  //const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedRecipeappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      recipeService.setToken(user.token)
      userService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    recipeService.getAllRecipes().then(data => setRecipes(data))
  }, [user])

  const handleLogin = async (username, password) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      setUser(loggedUser)
      //recipeService.setToken(loggedUser.token)
      userService.setToken(loggedUser.token)
      recipeService.setToken(loggedUser.token)
      window.localStorage.setItem('loggedRecipeappUser', JSON.stringify(loggedUser))
      console.log('Käyttäjä tallennettu localStorageen:', loggedUser)
    } catch (error) {
      console.error(error)
      setErrorMessage('Käyttäjätunnus tai salasana ei täsmää :(')
      setTimeout(() => setErrorMessage(null), 4000)
    }
  }

  /*const handleLogout = () => {
    window.localStorage.removeItem('loggedRecipeappUser')
    setUser(null)
    recipeService.setToken(null)
  }*/

  const handleAddRecipe = async (e) => {
    e.preventDefault()
    try{
      const added = await recipeService.createRecipe({ ...newRecipe, userId: user.id })
      setRecipes([...recipes, added])
      setNewRecipe({ name: '', ingredients: '', instructions: '', category: '', image: '', likes: '' })
    } catch (error) {
      console.error(error)
      setErrorMessage('Virhe reseptin lisäämisessä')
      setTimeout(() => setErrorMessage(null), 4000)
    }
  }
  //min-h-screen p-4 bg-white text-gray-900">

 return (
    <Router>
      <div className="container">
        <Navbar user={user} setUser={setUser} setMessage={setMessage} setMessageType={setMessageType} />

        <Notification message={message} type={messageType} />

        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}

        <Routes>
          <Route path="/" element={<HomePage recipes={recipes} user={user} />} />

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
            element={<RecipeForm user={user} />}
          />

          <Route
              path="/new-recipe"
              element={<NewRecipeForm />}
          />

          <Route
              path="/contact"
              element={<ContactPage />}
          />

          <Route
            path="/login"
            element={
              <LoginForm
                  setUser={setUser}
                  setErrorMessage={setErrorMessage}
                  onLogin={handleLogin}
              />
            }
          />
          <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
          />
        </Routes>
      </div>
    </Router>
 )
}

export default App

