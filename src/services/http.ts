import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000
})

http.interceptors.response.use(
  (response) => {
    console.log('[http] response raw data:', response.data)
    return response.data
  },
  (error) => {
    if (error.response) {
      console.log('[http] error raw data:', error.response.data)
    }
    return Promise.reject(error)
  }
)
