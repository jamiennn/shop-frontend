import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getCartApi, editCartApi, checkOutCartApi } from '@/api/cart.js'
import Swal from 'sweetalert2'
import { errorToast } from '@/helper/toast.js'
import router from '@/router'
import { useAuthenticator } from '@/stores/authenticator'


export const useCartStore = defineStore('cartStore', () => {
  const authenticator = useAuthenticator()
  const cartItems = reactive([])
  const status = ref('')
  const total = ref(0)


  // 小計
  function changeSubtotal(i) {
    cartItems[i].subtotal = cartItems[i].amount * cartItems[i].Product?.price
  }

  // 總計
  function getTotal() {
    total.value = 0
    for (const i in cartItems) {
      if (cartItems[i].subtotal) {
        total.value += cartItems[i].subtotal
      }
    }
  }

  // 取得購物車資料
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

  // 加購物車品項
  async function handleAddAmount(index) {
    cartItems[index].amount += 1
    handleEditCart(index)
    changeSubtotal(index)
    getTotal()
  }

  // 減購物車品項
  async function handleMinusAmount(index) {
    cartItems[index].amount -= 1
    handleEditCart(index)
    changeSubtotal(index)
    getTotal()
  }


  // 修改購物車內容
  const handleEditCart = async (index) => {

    status.value = 'submitting'

    const editedCart = await editCartApi(cartItems[index].id, cartItems[index].amount)
    if (!editedCart.success) {
      errorToast(
        'error',
        editedCart.messages
      )
      return router.push(`/carts/${authenticator.currentMember.id}`)
    }
    return status.value = 'typing'
  }

  // checkout 購物車
  const handleCheckoutCart = async () => {
    status.value = 'submitting'
    Swal.showLoading()
    const response = await checkOutCartApi()

    if (!response.success) {
      errorToast(
        'error',
        response.messages
      )
      return router.push(`/carts/${authenticator.currentMember.id}`)
    }

    Swal.fire('請確認您的訂單後前往結帳')
    router.push(`/orders/${response.messages.orders.order.id}/checkout`)
  }

  return {
    cartItems,
    status,
    getCart,
    handleAddAmount,
    handleMinusAmount,
    total,
    getTotal,
    handleCheckoutCart
  }
})