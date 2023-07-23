import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

export const loginApi = async (account, password) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, { account, password })
    const { data } = response
    if (response.status === 200) {
      return {
        success: true,
        messages: {
          loginUser: data.data.loginUser,
          token: data.data.token
        }
      }
    }
  } catch (e) {
    const { status, data } = e.response
    if (status === 500) {
      return { success: false, messages: data.messages }
    }
  }
}

export const getUserApi = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/${userId}`)
    const { data } = response

    if (response.status === 200) {
      return {
        success: true,
        messages: {
          user: data.messages.user,
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}


export const testTokenApi = async (authToken) => {
  try {
    const response = await axios.get(`${baseUrl}/test-token`, {
      headers: { Authorization: 'Bearer ' + authToken }
    })
    const { data } = response
    if (response.status === 200) {
      return {
        success: true,
        messages: { loginUser: data.data.loginUser }
      }
    }
  } catch (e) {
    if (e.response.status === 401) {
      return { success: false, messages: 'Please log in first.' }
    }
  }
}

