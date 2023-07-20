import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/products'

export const searchProductApi = async (queryString) => {
  try {
    const response = await axios.get(`${baseUrl}${queryString}`)
    const { data } = response

    if (response.status === 200) {
      return {
        success: true,
        messages: {
          products: data.data.products,
          categories: data.data.categories,
          pagination: data.data.pagination,
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


