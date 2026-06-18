import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const getProperties = async (params?: Record<string, string>) => {
  const response = await api.get('/properties', { params })
  return response.data
}

export const getPropertyById = async (id: string) => {
  const response = await api.get(`/properties/${id}`)
  return response.data
}