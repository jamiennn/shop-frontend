<script setup lang="ts">
import Header from '@/components/header/Header.vue'
import CartList from '@/components/cart/CartList.vue'

import { useCartStore } from '@/stores/cart'
const CartStore = useCartStore()

</script>

<template>
  <Header :searchbar="false" />
  <main class="container cart-container">
    <div class="cart-title">購物車</div>
    <section class="cart-list-container">
      <CartList />
    </section>
    <section class="cart-list-check cart-container">
      <p class="total">總計： $ {{ CartStore.total }}</p>
      <button class="btn-submit-cart">去下單</button>
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

.store-icon {
  width: 20px;
  height: 20px;
  margin-left: 40px;
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
  }
}
</style>