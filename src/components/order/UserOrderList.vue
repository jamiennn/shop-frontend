<script setup lang="ts">
import { onMounted, ref } from 'vue';
import OrderItem from '@/components/order/OrderItem.vue'

const prop = defineProps<{
  order: object
}>()

const total = ref(0)
onMounted(() => {
  if (prop.order.isChecked) {
    prop.order.OrderItems.forEach(o => {
      total.value += o.amount * o.productPrice
    })
  } else {
    prop.order.OrderItems.forEach(o => {
      total.value += o.amount * o.Product.price
    })
  }
})
</script>
<template>
  <div class="user-order">
    <router-link :to="`/orders/${order.id}`">
      <p class="order-id">訂單編號：{{ order.id }}</p>
    </router-link>
    <OrderItem :order="order" :key="order.id" />
    <div class="user-order-footer">
      <router-link :to="`/orders/${order.id}`">
        <div v-if="order.isChecked" class="order-status">
          訂單已完成
        </div>
        <div v-if="!order.isChecked" class="order-status">
          去結帳
        </div>
      </router-link>
      <p class="total">總計： $ {{ total }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-order {
  margin-bottom: 50px;
  padding: 20px;
  background-color: white;

  .order-id {
    @extend %standard-title;
    font-size: 16px;
  }
}

.user-order-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between
}

.total {
  @extend %standard-title;
}

.order-status {
  @extend %standard-button;
  height: 30px;
  width: 90px;
  line-height: 30px;
  text-align: center;
  font-weight: 500;
  color: var(--blue);
}
</style>
