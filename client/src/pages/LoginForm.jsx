import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import recipeService from '../services/recipes'
import userService from '../services/users'
import {Card, Form} from "react-bootstrap"


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
      <main className="navbar nav2 w-full justify-content-center">
          <Card className="p-4" style={{maxWidth: "800px", width: "100%", borderRadius: "2rem"}}>
              <Form onSubmit={handleRegister} className=" w-full justify-center items-center">
                  <h2 className="text-center mb-4 dark font-monospace">
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
                  <p>
                  <button
                      type="submit"
                      className="text-black px-4 py-2 navbutton">{isRegister ? 'Rekisteröidy' : 'Kirjaudu'}
                  </button>
                  </p>

                  <div className="mt-2 text-center">
                      {isRegister ? (
                          <p>
                              Onko sinulla jo tili?{' '}
                              <button
                                  type="button"
                                  className="navbutton text-black ms-1"
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
                                  className="navbutton ms-1"
                                  onClick={() => setIsRegister(true)}
                              >
                                  Rekisteröidy
                              </button>
                          </p>
                      )}
                  </div>
                  </Form>
              </Card>
      </main>
  )
}

export default LoginForm
