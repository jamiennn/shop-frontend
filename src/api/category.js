import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}/products/categories`

export const getCategoriesApi = async () => {
  try {
    const response = await axios.get(`${baseUrl}`)
    const { data } = response

    if (response.status === 200) {
      return {
        success: true,
        messages: {
          categories: data.data.categories,
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