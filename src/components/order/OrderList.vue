<script setup lang="ts">
import OrderItem from '@/components/order/OrderItem.vue'

defineProps<{
  order: object
}>()
</script>
<template>
  <section class="cart-list">
    <div class="cart-list-wrapper">
      <OrderItem :order="order" :key="order.id" />
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
