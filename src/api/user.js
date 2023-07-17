import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

export const login = async (account, password) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, { account, password })
    const { data } = response
    if (response.status === 200) {
      return { success: true, ...data }
    }
  } catch (e) {
    const { status, data } = e.response
    if (status === 500) {
      return { success: false, messages: data.messages }
    }
  }
}

