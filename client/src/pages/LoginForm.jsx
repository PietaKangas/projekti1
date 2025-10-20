import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import recipeService from '../services/recipes'
import userService from '../services/users'

const LoginForm = ({ setUser, showNotification }) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(false)


  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      if (isRegister){
          await userService.register({
              name,
              username,
              password,
          })
          showNotification('Rekisteröinti onnistui', 'success')
          setTimeout(() => showNotification(null), 4000)
          setIsRegister(false)
          setName('')
          setUsername('')
          setPassword('')
      } else {
          const user = await loginService.login({
              username: username,
              password: password,
          })

          window.localStorage.setItem(
              'loggedRecipeappUser', JSON.stringify(user)
          )

          recipeService.setToken(user.token)
          setUser(user)
          navigate('/')
          setUsername('')
          setPassword('')
        }
    } catch (exception) {
        console.error('Login error:', exception)
        showNotification(isRegister
            ? 'Rekisteröinti epäonnistui'
            : 'väärä käyttäjätunnus tai salasana', 'error')
        setTimeout(() => {
            showNotification(null)
        }, 4000)
    }
    }

  return (
      <form onSubmit={handleRegister} className="flex justify-center items-center min-h-screen border bg-gray-100">
          <nav className="custom-nav">
          <h2 className="container font-monospace mt-3 mb-4">
              {isRegister ? 'Rekisteröidy käyttäjäksi' : 'Kirjaudu sisään'}
          </h2>


          {isRegister && (
              <div className="mb-2">
                  <input
                      type="text"
                      placeholder="Nimi"
                      value={name}
                      onChange={({target}) => setName(target.value)}
                      className="block mb-1 font-medium text-gray-700"
                  />
              </div>
          )}
          <div className="mb-2">
              <input
                  type="text"
                  placeholder="Käyttäjätunnus"
                  value={username}
                  onChange={({target}) => setUsername(target.value)}
                  className="block mb-1 font-medium text-gray-700"
              />
          </div>
          <div className="mb-2">
              <input
                  type="password"
                  placeholder="Salasana"
                  value={password}
                  onChange={({target}) => setPassword(target.value)}
                  className="block mb-1 font-medium text-gray-700"
              />
          </div>
          <button
              type="submit"
              className="bg-gray-700 text-black px-4 py-2 rounded w-full">{isRegister ? 'Rekisteröidy' : 'Kirjaudu'}
          </button>

          <div className="mt-2 text-center">
              {isRegister ? (
                  <p>
                      Onko sinulla jo tili?{' '}
                      <button
                          type="button"
                          className="text-blue-600 underline"
                          onClick={() => setIsRegister(false)}
                      >
                          Kirjaudu sisään
                      </button>
                  </p>
              ) : (
                  <p>
                      Ei tiliä?{' '}
                      <button
                          type="button"
                          className="text-blue-600 underline"
                          onClick={() => setIsRegister(true)}
                      >
                          Rekisteröidy
                      </button>
                  </p>
              )}
          </div>
          </nav>
      </form>
  )
}

export default LoginForm
