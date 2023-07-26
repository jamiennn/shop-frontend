<script setup lang="ts">
import Header from '@/components/header/Header.vue'
import UserOrderList from '@/components/order/UserOrderList.vue'

import { onBeforeMount, reactive } from 'vue';

import { useRoute } from 'vue-router'
const route = useRoute()

// api
import { getUserOrderApi } from '@/api/order.js'

// stores
import { useAuthenticator } from '@/stores/authenticator'
const authenticator = useAuthenticator()

// swal
import { errorToast } from '@/helper/toast.js'
import router from '@/router';

const orders = reactive({})

onBeforeMount(async () => {
  const userId = Number(route.params.uid)
  if (userId !== authenticator.currentMember.id) {
    router.push('/')
    return errorToast('error', 'Forbidden')
  }
  const response = await getUserOrderApi(userId)

  if (!response.success) {
    errorToast('error', response.messages)
    return router.push('/')
  } else {
    const responseOrder = response.messages.order
    Object.assign(orders, responseOrder)
  }
})

</script>

<template>
  <Header :searchbar="false" />
  <main class="container order-container">
    <section v-if="orders[0]" class="order-list-container">
      <div class="order-title">所有訂單</div>
      <div class="order-list-wrapper">
        <UserOrderList v-for="(order, i) in orders" :order="order" :key="i" />
      </div>
    </section>
    <section v-if="!orders[0]" class="order-list-container">
      <div class="no-order-title">
        目前還沒有訂單，快去新增吧～
      </div>
    </section>
  </main>
</template>

<style lang="scss">
.order-container {
  flex-direction: column;
  word-wrap: break-word;
  padding: 0 20px;

  .order-title {
    @extend %standard-title;
    display: inline-block;
    margin: 0 50px 10px 100px;
  }

  .order-list-container,
  .order-list-check {
    width: 90%;
    min-width: 765px;
    margin: 0 auto;
    border-radius: 5px;
  }
}

.order-list-check {
  height: 200px;
  margin-top: 20px;
  text-align: end;

  .total {
    @extend %standard-title;
    font-size: 20px;
  }
}

.order-list-wrapper {
  margin: 20px;
  padding: 20px;
}

.no-order-title {
  @extend %standard-title;
  text-align: center;
}
</style>