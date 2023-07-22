<script setup lang="ts">
import Logout from '@/components/button/Logout.vue'
import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()

defineProps<{
  role: string,
  userId: number
}>()
const wrapperClass = "nav-list d-flex flex-row"
</script>

<template>
  <div v-if="role === 'buyer'" :class="wrapperClass">
    <li class="cart">
      <router-link class="nav-list-item" to="/cart/:uid">
        cart
      </router-link>
    </li>
    <Logout />
  </div>
  <div v-else-if="role === 'seller'" :class="wrapperClass">
    <li class="create">
      <router-link class="nav-list-item" to="/products/new">
        create
      </router-link>
    </li>
    <li class="product">
      <router-link class="nav-list-item" :to="`/users/${userId}/products`"
        @click="queryStringStore.handleClearQueryExceptShop">
        product
      </router-link>
    </li>
    <Logout />
  </div>
  <div v-else-if="role === 'guest'" :class="wrapperClass">
    <li class="create">
      <router-link class="nav-list-item" to="/login">
        login
      </router-link>
    </li>
  </div>
</template>

<style lang="scss">
.nav-list-item {
  @extend %standard-href;
  cursor: pointer;
  margin: 0 10px;
}
</style>