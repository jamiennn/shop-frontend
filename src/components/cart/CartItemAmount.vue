<script setup lang="ts">
import { ref, inject, watch, setup, onMounted } from 'vue'
import Plus from '@/assets/images/Plus.vue'
import Minus from '@/assets/images/Minus.vue'

const props = defineProps<{
  index: number
}>()

import { useCartStore } from '@/stores/cart'
const CartStore = useCartStore()
const cartItem = CartStore.cartItems[props.index]
const status = CartStore.status

</script>
<template>
  <div class="product-amount-control">

    <!-- 加號 -->
    <button class="btn-wrapper" @click="() => CartStore.handleAddAmount(index)"
      :disabled="cartItem.amount === cartItem.Product.stock || status === 'submitting'">
      <Plus class="btn-plus" />
    </button>

    <!-- 顯示數字 -->
    <div class="product-amount">{{ CartStore.cartItems[props.index].amount }}</div>

    <!-- 減號 -->
    <button @click="() => CartStore.handleMinusAmount(index)" :disabled="cartItem.amount === 1 || status === 'submitting'"
      class="btn-wrapper">
      <Minus class="btn-minus" />
    </button>
    <div class="product-stock">庫存：{{ cartItem.Product.stock }}</div>
  </div>
</template>

<style scoped lang="scss">
.product-amount-control {
  position: relative;


  .product-amount {
    position: relative;
    top: 10px;
    width: 70px;
    margin: 0 auto;
  }

  .btn-wrapper {
    border: 0px;
    background-color: white;
    cursor: pointer;

    .btn-minus,
    .btn-plus {
      width: 20px;
    }

    .btn-minus {
      position: relative;
      top: -15px;
      left: -45px
    }

    .btn-plus {
      position: relative;
      top: 40px;
      right: -45px
    }

    &:disabled .btn-minus,
    &:disabled .btn-plus {
      pointer-events: none;
      cursor: not-allowed;
      fill: var(--light-blue);
    }
  }

  .product-stock {
    font-size: 14px;
    color: var(--blue);
  }
}
</style>