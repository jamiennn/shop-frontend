<script setup lang="ts">
import Header from '@/components/header/Header.vue'
import OrderList from '@/components/order/OrderList.vue'

import { onBeforeMount, reactive, ref } from 'vue';

import { useRoute } from 'vue-router'
const route = useRoute()

// api
import { getOrderApi, checkOutOrderApi } from '@/api/order.js'

// stores
import { useAuthenticator } from '@/stores/authenticator'
const authenticator = useAuthenticator()

// swal
import { errorToast, successToast } from '@/helper/toast.js'
import router from '@/router';
import Swal from 'sweetalert2';

const order = reactive({})
const total = ref(0)
const status = ref('start')

onBeforeMount(async () => {
  const orderId = route.params.oid
  const response = await getOrderApi(orderId)

  if (!response.success) {
    errorToast('error', response.messages)
    return router.push('/')
  } else {
    const responseOrder = response.messages.order
    if (responseOrder.userId !== authenticator.currentMember.id) {
      errorToast('error', 'Forbidden')
      return router.push('/')
    }
    Object.assign(order, responseOrder)

    if (order.isChecked) {
      order.OrderItems.forEach(o => {
        total.value += o.amount * o.productPrice
      })
    } else {
      order.OrderItems.forEach(o => {
        total.value += o.amount * o.Product.price
      })
    }

  }
})

async function handleCheckOrder() {
  status.value = 'submitting'
  Swal.showLoading()
  const response = await checkOutOrderApi(route.params.oid)

  if (!response.success) {
    errorToast(
      'error',
      response.messages
    )
    return router.push(`/`)
  }
  successToast('success', '結帳成功')
  router.push(`/`)
}

</script>

<template>
  <Header :searchbar="false" />
  <main class="container cart-container">
    <div class="cart-title">訂單編號：{{ order.id }}</div>
    <section class="cart-list-container">
      <OrderList :order="order" />
    </section>
    <section class="cart-list-check cart-container">
      <p class="total">總計： $ {{ total }}</p>
      <button v-if="!order.isChecked" class="btn-submit-cart" @click="handleCheckOrder"
        :disabled="status === 'submitting'">結帳</button>
    </section>
  </main>
</template>

<style lang="scss">
.cart-container {
  flex-direction: column;
  word-wrap: break-word;
  padding: 0 20px;

  .cart-title {
    @extend %standard-title;
    display: inline-block;
    margin: 0 50px 20px 60px;
  }

  .cart-list-container,
  .cart-list-check {
    width: 90%;
    min-width: 765px;
    margin: 0 auto;
    background-color: white;
    border-radius: 5px;
  }
}


.cart-list-check {
  height: 200px;
  margin-top: 20px;
  text-align: end;

  .total {
    @extend %standard-title;
    font-size: 20px;
  }

  .btn-submit-cart {
    @extend %standard-button;
    margin-top: 20px;
    height: 40px;
    color: white;
    background-color: var(--dark-blue);
    font-size: 16px;
    font-weight: 500;

    &:disabled {
      background-color: var(--light-blue);
      cursor: not-allowed;
    }
  }
}
</style>