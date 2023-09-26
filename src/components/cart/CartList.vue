<script setup lang="ts">
import CartItem from '@/components/cart/CartItem.vue'
</script>
<template>
  <section class="cart-list">
    <div class="cart-list-wrapper">
      <CartItem />
    </div>
  </section>
</template>

<style scoped lang="scss">
.cart-list {
  background-color: white;

  .cart-list-wrapper {
    margin: 20px;
    padding: 20px;
  }
}
</style>
