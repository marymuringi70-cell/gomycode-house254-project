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

import type { AuthResponse } from '../types/user.js'

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const register = async (payload: {
  name: string
  email: string
  password: string
  role?: string
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