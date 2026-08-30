import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:5173',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default API
