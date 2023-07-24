import axiosInstanceHelper from '@/api/axiosInstance.js'

const baseUrl = 'http://localhost:3001/api/orders'


export const getOrderApi = async (orderId) => {
  try {
    const axiosInstance = await axiosInstanceHelper(baseUrl)
    const response = await axiosInstance.get(`${baseUrl}/${orderId}`)

    if (response.status === 200) {
      return {
        success: true,
        messages: {
          order: response.data.data.order,
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


export const checkOutOrderApi = async (orderId) => {
  try {
    const axiosInstance = await axiosInstanceHelper(baseUrl)
    const response = await axiosInstance.post(`${baseUrl}/${orderId}`)

    if (response.status === 200) {
      return { success: true }
    }
  } catch (e) {
    const { status, data } = e.response
    if (status === 500) {
      return { success: false, messages: data.messages }
    }
  }
}
