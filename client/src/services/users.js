import axios from 'axios'
const baseUrl = '/api/users'
/*
let token = null

const loggedUserJSON = localStorage.getItem('loggedRecipeappUser')
if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON)
  if (user.token) {
    token = `Bearer ${user.token}`
  }
}*/
const setToken = newToken => {
  //token = `Bearer ${newToken}`
  localStorage.setItem('loggedRecipeappUser', JSON.stringify({ token: newToken }))
}

const register = async (userData) => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}
/*
const getProfile = async () => {
  if (!token) throw new Error('Token puuttuu')

  const config = { headers: { Authorization: token } }
  const response = await axios.get(`${baseUrl}/profile`, config)
  return response.data
}

const deleteAccount = async () => {
  if (!token) throw new Error('Token puuttuu')

  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/profile`, config)
  return response.data
}
*/

const getProfile = async () => {
  const loggedUserJSON = localStorage.getItem('loggedRecipeappUser')
  if (!loggedUserJSON) throw new Error('Token puuttuu')

  const { token } = JSON.parse(loggedUserJSON)
  if (!token) throw new Error('Token puuttuu')

  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.get(`${baseUrl}/profile`, config)
  return response.data
}

const deleteAccount = async () => {
  const loggedUserJSON = localStorage.getItem('loggedRecipeappUser')
  if (!loggedUserJSON) throw new Error('Token puuttuu')

  const { token } = JSON.parse(loggedUserJSON)
  if (!token) throw new Error('Token puuttuu')

  const config = { headers: { Authorization: `Bearer ${token}` } }
  const response = await axios.delete(`${baseUrl}/profile`, config)
  return response.data
}

export default { register, deleteAccount, getProfile, setToken}
