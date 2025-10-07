import { Link, useNavigate } from 'react-router-dom'
import React from "react";
import recipes from '../../../server/uploads/recipes.jpg'
import logoutService from '../services/logout.js'

export default function Navbar({user, setUser, setMessage, setMessageType}) {
    const navigate = useNavigate()

    const handleLogout = () => {
        logoutService(navigate, setUser, setMessage, setMessageType)
    }

  return (
    <header className="flex grid-cols-3 items-center justify-between py-3 px-6">
      <div className="text-2xl font-bold">
          <Link to="/">
              <img src={recipes} alt="Reseptisivun logo" className="logo" />
          </Link>
      </div>

        <nav className="flex justify-self-center space-x-8 text-sm font-medium">
            <Link to="/" className="px-2 py-1"> KOTI </Link>
            <Link to="/recipes" className="px-2 py-1"> RESEPTIT </Link>
            <Link to="/contact" className="px-2 py-1"> OTA YHTEYTTÄ </Link>
                {!user ? (
                    <Link to="/login" className=" flex justify-self-end text-sm px-4 py-1 rounded"> KIRJAUDU / REKISTERÖIDY </Link>
                ) : (
                    <>
                        <Link to="/profile" className="flex space-x-4 items-center"> PROFIILI </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm px-4 py-1 text-black rounded"
                        >
                            KIRJAUDU ULOS
                        </button>
                    </>
                )}
        </nav>
    </header>
  )
}