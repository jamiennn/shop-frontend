<script setup lang="ts">
import { inject } from 'vue'
import Plus from '@/assets/images/Plus.vue'
import Minus from '@/assets/images/Minus.vue'

defineProps<{
  product: object
}>()

const status = inject('status')
const amount = inject('amount')

async function handleAddAmount() {
  status.value = 'typing'
  amount.value += 1
}

async function handleMinusAmount() {
  status.value = 'typing'
  amount.value -= 1
}
async function handleInputAmount(e) {
  status.value = 'typing'
  amount.value = Number(e.target.value)
}

</script>
<template>
  <div class="product-amount-control">
    <button @click="handleMinusAmount" :disabled="amount === 0 || status === 'submitting'" class="btn-wrapper">
      <Minus class="btn-minus" />
    </button>
    <input type="number" class="product-input" :value="amount" @input="handleInputAmount"
      :disabled="status === 'submitting'">
    <button @click="handleAddAmount" :disabled="amount === product.stock || status === 'submitting'" class="btn-wrapper">
      <Plus class="btn-plus" />
    </button>
    <div class="product-stock">庫存：{{ product.stock }}</div>
    <div class="product-subtotal">小計：{{ amount ? amount * product.price : 0 }}</div>
  </div>
</template>

<style scoped lang="scss">
.product-amount-control {
  position: relative;
  margin-top: 10px;

  .btn-wrapper {
    margin-top: 20px;
    border: 0px;
    background-color: white;
    cursor: pointer;

    .btn-minus {
      position: absolute;
      top: 5px;
      left: 0;
      width: 20px;
    }

    .btn-plus {
      position: absolute;
      top: 5px;
      left: 145px;
      width: 20px;
    }

    &:disabled .btn-minus,
    &:disabled .btn-plus {
      pointer-events: none;
      cursor: not-allowed;
      fill: var(--light-blue);
    }

  }

  .product-input {
    @extend %input-style;
    margin: 0 20px;
    width: 100px;
  }
}

.product-stock {
  margin-top: 20px;
}

.product-subtotal {
  margin: 20px;
  font-size: 20px;
  font-weight: 500;
  text-align: end;
  color: var(--danger);
}
</style>
