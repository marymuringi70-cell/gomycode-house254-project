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

export type AuthUser = {
  id: string
  name: string
  email: string
  role: 'seeker' | 'landlord' | 'admin'
  phoneNumber?: string
}

export type AuthResponse = {
  token: string
  user: AuthUser
}

export const login = async (payload: { email: string; password: string }): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', payload)
  return response.data
}

export const register = async (payload: {
  name: string
  email: string
  password: string
  role: AuthUser['role']
  phoneNumber?: string
}): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', payload)
  return response.data
}

export const getProperties = async (params?: Record<string, string>) => {
  const response = await api.get('/properties', { params })
  return response.data
}

export const getPropertyById = async (id: string) => {
  const response = await api.get(`/properties/${id}`)
  return response.data
}

