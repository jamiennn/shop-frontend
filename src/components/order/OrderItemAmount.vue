<script setup lang="ts">

defineProps<{
  amount: number
}>()

</script>
<template>
  <div class="product-amount-control">
    <div class="product-amount">{{ amount }}</div>
  </div>
</template>

<style scoped lang="scss">
.product-amount {
  width: 70px;
  margin: 0 auto;
}
</style>