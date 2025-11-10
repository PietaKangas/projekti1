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

    const [nameError, setNameError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

  const handleRegister = async (event) => {
    event.preventDefault()

      setNameError('')
      setUsernameError('')
      setPasswordError('')

      let valid = true

    try {
      if (isRegister){
          if (name.length > 20) {
              setNameError('Enintään 20 merkkiä')
              valid = false
          }
          if (username.length > 30) {
              setUsernameError('Enintään 30 merkkiä')
              valid = false
          }
          const passwordEhto = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
          if (!passwordEhto.test(password)) {
              setPasswordError('Salasanan tulee sisältää isoja ja\npieniä kirjaimia, numeroita sekä\noltava vähintään 8 merkkiä pitkä.')
              valid = false
          } else {
              setPasswordError('')
          }

          if (!valid) return

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
          <Card className="p-4" style={{maxWidth: "1000px", width: "100%", borderRadius: "2rem", border:"solid #CB0E40FF"}}>
              <Form onSubmit={handleRegister} className=" w-full justify-center items-center">
                  <h3 className="text-center mb-4 mt-2 dark font-monospace">
                      {isRegister ? 'Rekisteröidy käyttäjäksi' : 'Kirjaudu sisään'}
                  </h3>
                  {isRegister && (
                      <div className="mb-2">
                          <input
                              type="text"
                              placeholder="Nimi"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              className="w-100"/*"block mb-1 font-medium text-gray-700"*/
                          />
                          {nameError && <p className="punainen-teksi2">{nameError}</p>}
                      </div>
                  )}
                  <div className="mb-2">
                      <input
                          type="text"
                          placeholder="Käyttäjätunnus"
                          value={username}
                          onChange={({target}) => setUsername(target.value)}
                          required
                          className="w-100"/*"block mb-1 font-medium text-gray-700"*/
                      />
                      {usernameError && <p className="punainen-teksi2">{usernameError}</p>}
                  </div>
                  <div className="mb-2">
                      <input
                          type="password"
                          placeholder="Salasana"
                          value={password}
                          onChange={({target}) => setPassword(target.value)}
                          required
                          className="w-100"/*"block mb-2 font-medium text-gray-700"*/
                      />
                      {passwordError && <pre className="punainen-teksi2 leading-snug pl-3">{passwordError}</pre>}
                  </div>
                  <p>
                  <button
                      type="submit"
                      className="mt-2 text-black py-2 navbutton">{isRegister ? 'Rekisteröidy' : 'Kirjaudu'}
                  </button>
                  </p>

                  <div className="text-center">
                      {isRegister ? (
                          <p>
                              Onko sinulla jo tili?{' '}
                              <button
                                  type="button"
                                  className="navbutton text-black ms-2"
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
                                  className="navbutton ms-2"
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
