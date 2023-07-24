<script setup lang="ts">
import { watch, ref } from 'vue'
import CartItem from '@/components/cart/CartItem.vue'

// import { useCartStore } from '@/stores/cart'
// const CartStore = useCartStore()

// // 監控 input
// const cartListKey = ref('')

// // 監控store，若有變化要重新 render 此面板
// watch(CartStore, async () => {
//   cartListKey.value = CartStore.getCartListKey()
// }, { immediate: true })
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
  min-width: 765px;

  .cart-list-wrapper {
    margin: 20px;
    padding: 20px;
  }
}
</style>
