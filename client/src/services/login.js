import axios from 'axios'

const login = async (credentials) => {
  try {
    const response = await axios.post('/api/login', credentials)
    return response.data
  } catch (error) {
    console.log((error))
    throw new Error('Kirjautuminen epäonnistui. Tarkista käyttäjätunnus ja salasana.')
  }
}

export default { login }