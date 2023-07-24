<script setup lang="ts">
import { ref, onMounted } from 'vue'

// icons and pages
import Placeholder from '@/assets/images/MixerIcon-placeholder.vue'
import Cart from '@/assets/images/Cart.vue'
import CartItemAmount from '@/components/cart/CartItemAmount.vue'

// swal
import { errorToast, successToast } from '@/helper/toast.js'

// api
import { deleteCartApi } from '@/api/cart.js'

// stores
import { useCartStore } from '@/stores/cart'
const CartStore = useCartStore()
import { useAuthenticator } from '@/stores/authenticator'
const authenticator = useAuthenticator()

import router from '@/router'
const isLoaded = ref(false)

// 取得購物車內容
onMounted(async () => {
  CartStore.getCart()
})


// 刪除功能
async function handleDeleteCartItem(cartId) {
  const response = confirm('確定要從購物車刪除此商品嗎？')
  if (!response) return
  const data = await deleteCartApi(cartId)

  if (data.success) {
    successToast('success', '刪除成功')

    CartStore.getCart()
    // CartStore.cartListKey += 1
    router.push(`/carts/${authenticator.currentMember.id}`)
  } else {
    errorToast('error', data.messages)
  }
}

</script>

<template>
  <div v-if="CartStore.cartItems.length" class="have-cart-items">
    <table class="table">
      <thead>
        <tr class="table-header">
          <th class="table-cell-image">商品</th>
          <th class="table-cell-name">名稱</th>
          <th class="table-cell-price">單價</th>
          <th class="table-cell-amount">數量</th>
          <th class="table-cell-subtotal">小計</th>
          <th class="table-cell-delete">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(c, i) in CartStore.cartItems" :key="i" class="cart-item-wrapper table-row">

          <td class="table-row-image table-cell">
            <router-link :to="`/products/${c.Product.id}`" class="cart-item-link">
              <div class="cart-image-wrapper">
                <div v-if="c.Product.image" class="cart-image-center">
                  <img v-show="isLoaded" :src="c.Product.image" :alt="c.Product.name" class="cart-image"
                    @load="() => isLoaded = true">
                  <Placeholder v-show="!isLoaded" class="cart-image placeholder" />
                </div>
                <Placeholder v-if="!c.Product.image" class="cart-image placeholder" />
              </div>
            </router-link>
          </td>

          <td class="table-row-name table-cell">
            <router-link :to="`/products/${c.Product.id}`" class="cart-item-link">
              <p class="cart-name">{{ c.Product.name }}</p>
            </router-link>
          </td>

          <td class="table-row-price table-cell">
            <div class="cart-price">$ {{ c.Product.price }}</div>
          </td>

          <td class="table-row-amount table-cell">
            <CartItemAmount :index="i" />
          </td>
          <td class="table-row-delete table-cell">
            <div class="cart-subtotal">$ {{ c.subtotal }}</div>
          </td>
          <td class="table-row-delete table-cell">
            <div class="delete-cart-item" @click="() => handleDeleteCartItem(c.id)">刪除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="!CartStore.cartItems.length" class="no-cartItems">購物車還沒有物品</div>
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

  .table-cell-delete {
    width: 15%;
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

    .delete-cart-item {
      @extend %standard-href;
      cursor: pointer;
      text-align: center;
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

.no-cartItems {
  @extend %standard-title;
  font-size: 20px;
  text-align: center;
}
</style>
