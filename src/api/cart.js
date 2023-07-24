import axiosInstanceHelper from '@/api/axiosInstance.js'

const baseUrl = 'http://localhost:3001/api/carts'


export const createCartApi = async (productId, amount) => {
  try {
    const axiosInstance = await axiosInstanceHelper(baseUrl)
    const form = { productId, amount }
    const response = await axiosInstance.post(`${baseUrl}`, form)

    if (response.status === 200) {
      return {
        success: true,
        messages: response.data.data.newCartItem
      }
    }
  } catch (e) {
    const { status, data } = e.response
    if (status === 500) {
      return { success: false, messages: data.messages }
    }
  }
}

export const editCartApi = async (cartId, amount) => {
  try {
    const axiosInstance = await axiosInstanceHelper(baseUrl)
    const form = { amount }
    const response = await axiosInstance.post(`${baseUrl}/${cartId}?_method=PUT`, form)

    if (response.status === 200) {
      return {
        success: true,
        messages: response.data.data.newCartItem
      }
    }
  } catch (e) {
    const { status, data } = e.response
    if (status === 500) {
      return { success: false, messages: data.messages }
    }
  }
}

export const getCartApi = async () => {
  try {
    const axiosInstance = await axiosInstanceHelper(baseUrl)
    const response = await axiosInstance.get(`${baseUrl}`)

    if (response.status === 200) {
      return {
        success: true,
        messages: {
          carts: response.data.data.cartItems,
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

export const deleteCartApi = async (cartId) => {
  try {
    const axiosInstance = await axiosInstanceHelper(baseUrl)

    const response = await axiosInstance.post(`${baseUrl}/${cartId}?_method=DELETE`)

    if (response.status === 200) {
      return {
        success: true,
        messages: response.data.data
      }
    }
  } catch (e) {
    const { status, data } = e.response
    if (status === 500) {
      return { success: false, messages: data.messages }
    }
  }
}

export const checkOutCartApi = async () => {
  try {
    const axiosInstance = await axiosInstanceHelper(baseUrl)
    const response = await axiosInstance.post(`${baseUrl}/checkout`)

    if (response.status === 200) {
      return {
        success: true,
        messages: {
          orders: response.data.data
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
