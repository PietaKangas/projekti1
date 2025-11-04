import { Link, useNavigate } from 'react-router-dom'
import React from "react";
import logoo from '../assets/logoo.png'

export default function Navbar({user, setUser, showNotification}) {
    const navigate = useNavigate()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedRecipeappUser')
        setUser(null)
        showNotification('Kirjauduit ulos onnistuneesti', 'success')
        navigate('/')
    }

  return (
      <header className="w-full flex items-center">
          <div className="navbar nav3 px-4">
              <Link to="/">
                  <img src={logoo} alt="Reseptisivun logo" className="logo"/>
              </Link>
              <Link to="/" className="px-2 py-1"> KOTI </Link>
              <Link to="/recipes" className="px-2 py-1"> RESEPTIT </Link>
              <Link to="/contact" className="px-2 py-1"> OTA YHTEYTTÄ </Link>
              {!user ? (
                  <Link to="/login" className="flex justify-self-end px-4 py-1 navbutton text-white"> KIRJAUDU /
                      REKISTERÖIDY </Link>
              ) : (
                  <>
                      <Link to="/profile" className="flex space-x-4 px-2 py-1 items-center"> PROFIILI </Link>
                      <button
                          onClick={handleLogout}
                          className="text-sm px-4 py-1 navbutton text-white"
                      >
                          KIRJAUDU ULOS
                      </button>
                  </>
              )}
          </div>
      </header>
  )
}