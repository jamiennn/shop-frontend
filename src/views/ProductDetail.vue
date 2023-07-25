<script setup lang="ts">
import { computed, reactive, ref, provide, watch } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router'

// templates
import Header from '@/components/header/Header.vue'
import ProductAmount from '@/components/product/ProductAmount.vue'

// icons
import Store from '@/assets/images/Store.vue'
import Placeholder from '@/assets/images/MixerIcon-placeholder.vue'
import Edit from '@/assets/images/Edit.vue'
import Delete from '@/assets/images/Delete.vue'

// apis
import { searchOneProductApi, patchProductApi } from '@/api/product.js'
import { createCartApi } from '@/api/cart.js'

// stores
import { useAuthenticator } from '@/stores/authenticator'
const authenticator = useAuthenticator()
import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()
import { useCartStore } from '@/stores/cart'
const CartStore = useCartStore()

import Swal from 'sweetalert2'
import { errorToast, successToast } from '@/helper/toast.js'

const route = useRoute()
const pid = ref(Number(route.params.pid))
const product = reactive({})
const status = ref('start')
const isLoaded = ref(false)
const amount = ref(0)

provide('status', status)
provide('amount', amount)

// 監控路由、獲取單個商品資料
watch(route, async () => {
  pid.value = Number(route.params.pid)

  const data = await searchOneProductApi(pid.value)

  if (data.success) {
    const getProduct = data.messages.product
    Object.assign(product, getProduct)
  } else {
    errorToast('error', data.messages)
  }
}, { immediate: true })

// 加入購物車功能
const handleAddToCart = async () => {
  status.value = 'submitting'
  Swal.showLoading()

  const response = await createCartApi(pid.value, amount.value)

  if (!response.success) {
    status.value = 'error'
    errorToast(
      'error',
      response.messages
    )
  } else {
    status.value = 'success'
    successToast(
      'success',
      `加入購物車成功`
    )
    CartStore.status = 'start'
    router.push(`/carts/${authenticator.currentMember.id}`)
  }
}

// 下架功能
async function handleOffShelf(productId) {
  const response = confirm('確定要下架此商品嗎？')
  if (!response) return
  const data = await patchProductApi(productId)
  if (data.success) {
    successToast('success', '下架成功')
    queryStringStore.handleClearQueryExceptShop()
    router.push(`/users/${authenticator.currentMember.id}/products`)
  } else {
    errorToast('error', data.messages)
  }
}

// 根據表單狀態計算樣式
const inputInvalid = computed(() => {
  if (status.value === 'start' ||
    amount.value === 0 ||
    amount.value > product.stock.value ||
    status.value === 'submitting' ||
    status.value === 'error') return true
  return false
})
</script>

<template>
  <Header :searchbar="false" />
  <main class="container product-detail-container">
    <div class="product-category">分類：{{ product?.Category?.name }}</div>
    <section class="product-detail">
      <div class="product-image-wrapper">
        <div v-if="product.image" class="product-image-center">
          <img v-show="isLoaded" :src="product.image" :alt="product.name" class="product-image"
            @load="() => isLoaded = true">
          <Placeholder v-show="!isLoaded" class="product-image placeholder" />
        </div>
        <Placeholder v-if="!product.image" class="product-image placeholder" />
      </div>

      <div class="product-info">
        <div class="product-name">{{ product.name }}</div>
        <div class="product-price">${{ product.price }}</div>

        <!-- buyer -->
        <div class="product-btn-wrapper" v-if="authenticator.role === 'buyer'">
          <ProductAmount :product="product" />
          <button class="btn-confirm btn-submit" :disabled="inputInvalid" @click="handleAddToCart">加入購物車</button>
        </div>

        <!-- seller -->
        <div v-if="product.User.id === authenticator.currentMember.id" class="seller">
          <div class="seller-button-wrapper">
            <router-link :to="`/products/${product.id}/edit`">
              <Edit class="btn-product" />
              <span class="button-label">編輯</span>
            </router-link>
            <div style="cursor: pointer" @click="() => handleOffShelf(product.id)">
              <Delete class="btn-product" />
              <span class="button-label">下架</span>
            </div>
          </div>
        </div>

      </div>

    </section>
    <section class="seller-section">
      <Store class="store-icon" />
      <router-link :to="`/users/${product.User.id}/products`">
        <div class="seller-title">{{ product.User.account }}</div>
      </router-link>
    </section>
    <section class="description-section">
      <div class="product-description">{{ product.description }}</div>
    </section>
  </main>
</template>

<style lang="scss">
.product-detail-container {
  flex-direction: column;
  justify-content: space-between;
  word-wrap: break-word;
  margin-top: 30px;
  padding: 0 20px;

  .product-category {
    @extend %standard-href;
    text-align: start;
    margin: 0 0 20px 0;

    &:hover {
      text-decoration: none;
    }
  }


  // detail section
  .product-detail {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    padding: 20px;
    background-color: white;

    .product-image-wrapper {
      width: 45%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;

      .product-image-center {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .product-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .placeholder {
        width: 20%;
        height: 20%;
      }
    }

    .product-info {
      width: 45%;

      .product-name {
        @extend %standard-title;
        display: inline-block;
        margin: 0 20px 0 0;
        width: 100%;
      }

      .product-price {
        width: 100%;
        margin-top: 20px;
        font-size: 20px;
        font-weight: 500;
        // color: var(--danger);
      }

      .product-btn-wrapper {
        position: relative;
        height: 200px;

        .btn-submit {
          position: absolute;
          bottom: 15px;
          right: 15px;
          margin-top: 20px;
          height: 35px;
          border-radius: 3px;
          border: 0px;
          background-color: var(--blue);
          color: white;
          font-size: 17px;
          font-weight: 900;
          cursor: pointer;

          &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        }
      }
    }
  }

  // seller-section
  .seller-section {
    .seller-title {
      @extend %standard-title;
      display: inline-block;
      margin: 30px 10px;
    }

    .store-icon {
      width: 20px;
      height: 20px;
      margin-left: 40px;
    }
  }

  // description section
  .product-description {
    width: 100%;
    background-color: white
  }
}



// 按鈕部分

.seller {

  .seller-button-wrapper {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 20px;
  }

  .btn-product {
    margin: 20px 10px 10px 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .button-label {
    position: absolute;
    top: 15px;
    padding: 3px 3px;
    border-radius: 6px;

    background-color: var(--dark-blue);
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>