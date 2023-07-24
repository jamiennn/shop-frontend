<script setup lang="ts">
import Logout from '@/components/button/Logout.vue'
import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()
import router from '@/router';

defineProps<{
  role: string,
  user: object
}>()
const wrapperClass = "nav-list d-flex flex-row"
</script>

<template>
  <div v-if="role === 'buyer'" :class="wrapperClass">
    <li class="cart">
      <router-link class="nav-list-item" :to="`/carts/${user.id}`">
        cart
      </router-link>
    </li>
    <Logout />
  </div>
  <div v-else-if="user && role === 'seller'" :class="wrapperClass">
    <li class="create">
      <router-link class="nav-list-item" to="/products/new">
        create
      </router-link>
    </li>
    <li class="product">
      <router-link class="nav-list-item" :to="`/users/${user.id}/products`" @click="() => {
        // 清除搜尋條件
        queryStringStore.handleClearAll()
        // 重新提供shopId

        queryStringStore.shopId = user.id
        // 強制 re-render
        router.push(`/users/${user.id}/products`)
      }">
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
  <div class="nav-list-item" v-if="user">{{ user.account }}</div>
</template>

<style lang="scss">
.nav-list-item {
  @extend %standard-href;
  cursor: pointer;
  margin: 0 10px;
}
</style>