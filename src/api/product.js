import axios from 'axios'
import axiosInstanceHelper from '@/api/axiosInstance.js'

const baseUrl = `${import.meta.env.VITE_API_URL}/products`

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

export const searchOneProductApi = async (pid) => {
  try {
    const response = await axios.get(`${baseUrl}/${pid}`)

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

export const createProductApi = async (form) => {
  try {
    const axiosInstance = await axiosInstanceHelper(baseUrl)

    const formData = new FormData()
    formData.append('name', form.nameInput)
    formData.append('price', form.priceInput)
    formData.append('description', form.descriptionInput)
    formData.append('image', form.imageInput)
    formData.append('stock', form.stockInput)
    formData.append('categoryId', form.categoryInput)

    const response = await axiosInstance.post(`${baseUrl}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 200) {
      return {
        success: true,
        messages: response.data.data.product
      }
    }
  } catch (e) {
    const { status, data } = e.response
    if (status === 500) {
      return { success: false, messages: data.messages }
    }
  }
}

export const editProductApi = async (pid, form) => {
  try {
    const axiosInstance = await axiosInstanceHelper(baseUrl)

    const formData = new FormData()
    formData.append('name', form.nameInput)
    formData.append('price', form.priceInput)
    formData.append('description', form.descriptionInput)
    formData.append('image', form.imageInput)
    formData.append('stock', form.stockInput)
    formData.append('categoryId', form.categoryInput)

    const response = await axiosInstance.post(`${baseUrl}/${pid}?_method=PUT`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 200) {
      return {
        success: true,
        messages: response.status
      }
    }
  } catch (e) {
    const { status, data } = e.response
    if (status === 500) {
      return { success: false, messages: data.messages }
    }
  }
}

export const patchProductApi = async (productId) => {
  try {
    const axiosInstance = await axiosInstanceHelper(baseUrl)

    const response = await axiosInstance.post(`${baseUrl}/${productId}?_method=PATCH`)

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


