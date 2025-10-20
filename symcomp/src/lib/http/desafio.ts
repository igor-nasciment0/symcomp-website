import axios from 'axios'

const baseURL = 'http://localhost:8000'

export const desafio = axios.create({
  baseURL: `${baseURL}/desafio`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

desafio.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
)
