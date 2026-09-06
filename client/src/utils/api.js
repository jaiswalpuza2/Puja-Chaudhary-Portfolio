import axios from 'axios'

// All backend calls go through this base URL.
// In production, set VITE_API_BASE_URL in your hosting environment.
// In development, Vite's proxy forwards /api/* to localhost:5000 so
// we can leave the base URL empty.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export default api
