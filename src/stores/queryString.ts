import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { searchProductApi } from '@/api/product.js'
import { errorToast } from '@/helper/toast.js'
import router from '@/router'

export const useQueryStringStore = defineStore('queryStringHelper', () => {

  // 統一宣告搜尋條件
  const keyword = ref('')
  const priceMin = ref('')
  const priceMax = ref('')
  const page = ref(1)
  const shopId = ref('')

  // 用於 re-render product 
  const productListKey = ref(0)

  // 計算出 queryString
  const queryString = computed(() => {
    let str = '?'
    if (keyword.value) str += `keyword=${keyword.value}`
    if (priceMin.value) str += `&priceMin=${priceMin.value}`
    if (priceMax.value) str += `&priceMax=${priceMax.value}`
    if (page.value) str += `&page=${page.value}`
    if (shopId.value) str += `&shopId=${shopId.value}`

    return str
  })

  function queryRedirect() {
    router.push(
      `/${queryString.value}`
    )
  }

  // 用於 re-render product 
  function getProductListKey() {
    return `product-list-wrapper-${productListKey.value}`
  }

  function handleClickPage(e) {
    page.value = e.target.innerText
    productListKey.value += 1
    queryRedirect()
  }
  function handleSearchKeyword(newKeyword) {
    keyword.value = newKeyword
    productListKey.value += 1
    page.value = 1
    queryRedirect()
  }

  function handlePriceRange(newPriceMin, newPriceMax) {
    priceMin.value = newPriceMin
    priceMax.value = newPriceMax
    page.value = 1

    productListKey.value += 1

    queryRedirect()
  }

  function handleClearSearch() {

    priceMin.value = ''
    priceMax.value = ''
    page.value = 1

    // 用於 re-render product 
    productListKey.value += 1
    queryRedirect()
  }

  function handleClearAll() {
    keyword.value = ''
    shopId.value = ''
    handleClearSearch()
  }

  function handleClearQueryExceptShop() {
    keyword.value = ''
    priceMin.value = ''
    priceMax.value = ''
    page.value = 1
  }

  async function handleHomePage() {
    const data = await searchProductApi(queryString.value)
    if (data.success) {
      const products = data.messages.products
      const pagination = data.messages.pagination

      return { products, pagination }
    } else {
      errorToast(
        'error',
        data.messages
      )
    }
  }


  return {
    keyword,
    priceMin,
    priceMax,
    page,
    shopId,
    queryString,
    handleClickPage,
    handleHomePage,
    getProductListKey,
    productListKey,
    handleSearchKeyword,
    handlePriceRange,
    handleClearSearch,
    handleClearAll,
    handleClearQueryExceptShop
  }
})