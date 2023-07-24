import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { getCartApi, editCartApi } from '@/api/cart.js'
import Swal from 'sweetalert2'
import { errorToast, successToast } from '@/helper/toast.js'
import router from '@/router'
import { useAuthenticator } from '@/stores/authenticator'


export const useCartStore = defineStore('cartStore', () => {
  const authenticator = useAuthenticator()
  const cartItems = reactive([])
  const status = ref('')
  const total = ref(0)

  // // 用於 re-render cart 
  // const cartListKey = ref(0)
  // function getCartListKey() {
  //   return `cart-list-wrapper-${cartListKey.value}`
  // }


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
    changeSubtotal(index)
    getTotal()
  }

  // 減購物車品項
  async function handleMinusAmount(index) {
    cartItems[index].amount -= 1
    changeSubtotal(index)
    getTotal()
  }


  // checkout 購物車，修改購物車內容
  const handleCheckoutCart = async () => {

    status.value = 'submitting'
    Swal.showLoading()

    cartItems.forEach(async c => {
      const editedCart = await editCartApi(c.id, c.amount)
      if (!editedCart.success) {
        errorToast(
          'error',
          editedCart.messages
        )
        return router.push(`/carts/${authenticator.currentMember.id}`)
      }
    })

    Swal.fire('請確認您的訂單後前往結帳')
    router.push(`/carts/${authenticator.currentMember.id}/confirm`)
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