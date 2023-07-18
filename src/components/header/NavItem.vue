<script setup lang="ts">
import Logout from '@/components/button/Logout.vue'

defineProps<{
  role: string
}>()
const wrapperClass = "nav-list d-flex flex-row"
</script>

<template>
  <div v-if="role === 'buyer'" :class="wrapperClass">
    <li class="cart">
      <a class="nav-list-item" href="/cart/:uid">
        cart
      </a>
    </li>
    <Logout />
  </div>
  <div v-else-if="role === 'seller'" :class="wrapperClass">
    <li class="create">
      <a class="nav-list-item" href="/products/new">
        create
      </a>
    </li>
    <li class="product">
      <a class="nav-list-item" href="/users/:uid/products">
        product
      </a>
    </li>
    <Logout />
  </div>
  <div v-else-if="role === 'guest'" :class="wrapperClass">
    <li class="create">
      <a class="nav-list-item" href="/login">
        login
      </a>
    </li>
  </div>
</template>

<style lang="scss">
@import '../../assets/main.scss';

.nav-list-item {
  @extend %standard-href;
  cursor: pointer;
  margin: 0 10px;
}
</style>