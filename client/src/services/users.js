import axios from 'axios'
const baseUrl = '/api/users'

let token = null
export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const register = async (userData) => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}

const getProfile = async () => {
  const config = { headers: { Authorization: token } }
  const response = await axios.get(`${baseUrl}/profile`, config)
  return response.data
}

const deleteAccount = async () => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/profile`, config)
  return response.data
}

export default { register, deleteAccount, getProfile, setToken}
