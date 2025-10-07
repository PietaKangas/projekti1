import axios from 'axios'

const baseUrl = '/api/recipes'

let token =  '' 

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllRecipes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getRecent = async () => {
  const response = await axios.get(`${baseUrl}/recent`)
  return response.data
}

export const createRecipe = async (formData) => {
  const config = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  }
  const response = await axios.post(baseUrl, formData, config)
  return response.data
}

const getRecipeById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const likeRecipe = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.put(`${baseUrl}/${id}/like`, {}, config)
  return response.data
}

const deleteRecipe = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAllRecipes, createRecipe, getRecipeById, setToken, likeRecipe, deleteRecipe, getRecent }
