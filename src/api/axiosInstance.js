import axios from 'axios'

export const axiosInstance = (baseURL) => {
  const instance = axios.create({ baseURL })
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken")
      if (token) config.headers['Authorization'] = `Bearer ${token}`
      return config
    }, (error) => console.error(error)
  )
}
