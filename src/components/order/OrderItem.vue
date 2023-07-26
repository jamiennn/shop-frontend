<script setup lang="ts">
defineProps<{
  order: object
}>()
// icons and pages
import Placeholder from '@/assets/images/MixerIcon-placeholder.vue'
import orderItemAmount from '@/components/order/OrderItemAmount.vue'

</script>

<template>
  <div class="have-cart-items" :key="order.id">
    <table class="table">
      <thead>
        <tr class="table-header">
          <th class="table-cell-image">商品</th>
          <th class="table-cell-name">名稱</th>
          <th class="table-cell-price">單價</th>
          <th class="table-cell-amount">數量</th>
          <th class="table-cell-subtotal">小計</th>
        </tr>
      </thead>

      <!-- 如果還沒結帳，商品的 name, price, image 會依照商品現況更新 -->
      <!-- 如果已經結帳，使用存在 order item裡的資訊 -->
      <tbody>
        <tr v-for="(o, i) in order.OrderItems" :key="i" class="cart-item-wrapper table-row">
          <td class="table-row-image table-cell">
            <router-link :to="`/products/${o.Product.id}`" class="cart-item-link">
              <div class="cart-image-wrapper">
                <div v-if="order.isChecked ? o.productImage : o.Product.image" class="cart-image-center">
                  <img :src="order.isChecked ? o.productImage : o.Product.image" :alt="o.Product.name" class="cart-image">
                </div>
                <Placeholder v-if="order.isChecked ? !o.productImage : !o.Product.image" class="cart-image placeholder" />
              </div>
            </router-link>
          </td>

          <td class="table-row-name table-cell">
            <router-link :to="`/products/${o.Product.id}`" class="cart-item-link">
              <p class="cart-name">{{ order.isChecked ? o.productName : o.Product.name }}</p>
            </router-link>
          </td>

          <td class="table-row-price table-cell">
            <div class="cart-price">$ {{ order.isChecked ? o.productPrice : o.Product.price }}</div>
          </td>

          <td class="table-row-amount table-cell">
            <orderItemAmount :amount="o.amount" />
          </td>
          <td class="table-row-delete table-cell">
            <div v-if="order.isChecked" class="cart-subtotal">$ {{ o.amount * o.productPrice }}</div>
            <div v-if="!order.isChecked" class="cart-subtotal">$ {{ o.amount * o.Product.price }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.table {
  width: 100%;
}

.table-header {
  width: 100%;
  font-size: 16px;
  border-bottom: 5px double var(--light-blue);

  .table-cell-image {
    width: 20%;
  }

  .table-cell-name {
    width: 20%;
  }

  .table-cell-price {
    width: 15%
  }

  .table-cell-amount {
    width: 20%;
  }

  .table-cell-subtotal {
    width: 15%
  }
}

.table-row {
  border-bottom: 1px solid var(--light-blue);

  .table-cell {
    padding: 10px 6px;
    text-align: center;
    vertical-align: middle;

    .cart-image-wrapper {
      position: relative;
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;

      .cart-image-center {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      .cart-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .placeholder {
        width: 20%;
        height: 20%;
      }
    }
  }
}



.cart-item-link {

  .cart-name {
    display: inline-block;
    width: 100%;

    // font
    color: var(--blue);
    line-height: 1.5rem;
    max-height: 3rem;
    font-size: 15px;
    font-weight: 400;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .cart-price {
    font-size: 15px;
    font-weight: 400;
    text-align: end;
  }
}
</style>
