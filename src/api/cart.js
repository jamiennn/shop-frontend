import axios from 'axios'
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


