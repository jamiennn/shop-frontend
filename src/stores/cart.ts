import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getCartApi } from '@/api/cart.js'

import { errorToast } from '@/helper/toast.js'
import router from '@/router'

export const useCartStore = defineStore('cartStore', () => {

  const cartItems = reactive([])
  const status = ref('')
  const total = ref(0)

  // // 用於 re-render cart 
  // const cartListKey = ref(0)
  // function getCartListKey() {
  //   return `cart-list-wrapper-${cartListKey.value}`
  // }


  function changeSubtotal(i) {
    cartItems[i].subtotal = cartItems[i].amount * cartItems[i].Product?.price
  }

  function getTotal() {
    total.value = 0
    for (const i in cartItems) {
      if (cartItems[i].subtotal) {
        total.value += cartItems[i].subtotal
      }
    }
  }

  async function getCart() {

    // 清空陣列資料
    cartItems.values = cartItems.splice(0)

    // total.value = 0
    const data = await getCartApi()
    if (data.success) {
      const newCartItems = data.messages.carts

      Object.assign(cartItems, newCartItems)
      for (const i in cartItems) {
        changeSubtotal(i)
      }
      getTotal()
    } else if (!data.success) {
      console.error(data.messages)
    }
  }

  async function handleAddAmount(index) {
    // status.value = 'submitting'
    cartItems[index].amount += 1
    changeSubtotal(index)
    getTotal()
  }

  async function handleMinusAmount(index) {
    // status.value = 'submitting'
    cartItems[index].amount -= 1
    changeSubtotal(index)
    getTotal()
  }



  // 加入購物車功能
  const handleAddToCart = async (productId) => {

    Swal.showLoading()
    const response = await createCartApi(productId, 1)

    if (!response.success) {
      errorToast(
        'error',
        response.messages
      )
    } else {
      successToast(
        'success',
        `加入購物車成功`
      )
      router.push(`/carts/${authenticator.currentMember.id}`)
    }
  }

  return {
    cartItems,
    getCart,
    handleAddAmount,
    handleMinusAmount,
    total,
    getTotal,
    // getCartListKey
  }
})