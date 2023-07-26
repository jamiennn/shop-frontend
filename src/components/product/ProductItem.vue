<script setup lang="ts">
import { watch, reactive } from 'vue'
import Placeholder from '@/assets/images/MixerIcon-placeholder.vue'
import Edit from '@/assets/images/Edit.vue'
import Delete from '@/assets/images/Delete.vue'
import Cart from '@/assets/images/Cart.vue'
import Swal from 'sweetalert2'


import { patchProductApi } from '@/api/product.js'
import { errorToast, successToast } from '@/helper/toast.js'
import { createCartApi } from '@/api/cart.js'


import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()
import { useAuthenticator } from '@/stores/authenticator'
import router from '@/router'
const authenticator = useAuthenticator()

const products = reactive({})
const isLoaded = reactive([])
const emit = defineEmits(['update:modelValue'])

defineProps<{
  sellerId: number,
  modelValue: boolean
}>()

// 監控 query string store，更新 products
watch(queryStringStore, async () => {

  const data = await queryStringStore.handleHomePage()
  const newProducts = data?.products

  Object.assign(isLoaded, Array.from({ length: newProducts }, l => false))

  for (let p in products) {
    delete products[p]
  }

  Object.assign(products, newProducts)
  emit('update:modelValue', true)
}, { immediate: true })


// 下架功能
async function handleOffShelf(productId) {
  const authToken = localStorage.getItem('authToken')
  await authenticator.checkPermission(authToken)
  if (!authToken || !authenticator.isAuthenticated) {
    router.push('/login')
    return errorToast('error', 'Forbidden')
  }

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

// 加入購物車功能
const handleAddToCart = async (productId) => {
  const authToken = localStorage.getItem('authToken')
  await authenticator.checkPermission(authToken)
  if (!authToken || !authenticator.isAuthenticated) {
    router.push('/login')
    return errorToast('error', 'Forbidden')
  }

  Swal.showLoading()
  const response = await createCartApi(productId, 1)

  if (!response.success) {
    errorToast(
      'error',
      response.messages
    )
  } else {
    successToast(
      'success',
      `加入購物車成功`
    )
  }
}

</script>

<template>
  <div v-for="(product, i) in products" :key="i" class="product-item-link">
    <router-link :to="`/products/${product.id}`">
      <div class="product-item-wrapper">
        <div class="product-image-wrapper">
          <div v-if="product.image" class="product-image-center">
            <img v-show="isLoaded[i]" :src="product.image" :alt="product.name" class="product-image"
              @load="() => isLoaded[i] = true">
            <Placeholder v-show="!isLoaded[i]" class="product-image placeholder" />
          </div>
          <Placeholder v-if="!product.image" class="product-image placeholder" />
        </div>
        <div class="product-name">
          {{ product.name }}
        </div>
        <div class="product-price">${{ product.price }}</div>
      </div>
    </router-link>

    <!-- 按鈕部分 -->
    <div v-if="authenticator.role === 'buyer'" class="buyer">
      <Cart class="btn-product btn-add-product" id="btn-add-product" @click="() => handleAddToCart(product.id)" />
      <span class="tooltip tooltip-add">加入購物車</span>

    </div>
    <div v-if="authenticator?.currentMember?.id === sellerId" class="seller">
      <router-link :to="`/products/${product.id}/edit`">
        <Edit class="btn-product btn-edit-product" id="btn-edit-product" />
        <span class="tooltip tooltip-edit">編輯</span>
      </router-link>
      <Delete class="btn-product btn-delete-product" id="btn-delete-product" @click="() => handleOffShelf(product.id)" />
      <span class="tooltip tooltip-delete">下架</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-item-link {
  display: block;
  position: relative;

  color: black;
  width: 150px;

  .product-item-wrapper {
    width: 150px;
    height: 250px;
    background-color: var(--gray);
    overflow: hidden;
    @extend %standard-boxshadow;

    &:hover {
      opacity: .4;
      box-shadow: 3px 0 13px 0 var(--dark-blue, 0.1);
      transition: all .4s ease-out;
    }

    .product-image-wrapper {
      position: relative;
      width: 100%;
      height: 50%;
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

    .product-name,
    .product-price {
      display: inline-block;
      width: 100%;
      padding: 5px 10px 0 10px;

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

    .product-price {
      margin-top: 20px;
      text-align: end;
      font-size: 20px;
      font-weight: 500;
      color: var(--danger);
    }
  }

}

// 按鈕部分
.btn-product {
  display: none;
  position: absolute;
  top: 20%;
  width: 15%;
  height: 15%;
}

.seller,
.buyer {

  .btn-edit-product {
    left: 20%;
  }

  .btn-add-product {
    left: 50%;
    transform: translate(-50%);
  }

  .tooltip {
    opacity: 0;
    position: absolute;
    top: 100px;

    background-color: var(--dark-blue);
    border-radius: 6px;
    padding: 3px 3px;

    color: #fff;
    text-align: center;
    font-size: 5px;
    font-weight: 500;
  }

  .tooltip-add {
    top: 90px;
    left: 28%;
  }

  .tooltip-edit {
    left: 23%;
  }

  .tooltip-delete {
    right: 23%;
  }


  .btn-add-product:hover~.tooltip-add,
  .btn-edit-product:hover~.tooltip,
  .btn-delete-product:hover~.tooltip {
    opacity: 1;
    transition: all .4s ease-out;
  }

  .btn-delete-product {
    right: 20%;
  }
}

.product-item-link:hover #btn-add-product,
.product-item-link:hover #btn-edit-product,
.product-item-link:hover #btn-delete-product {
  display: block;
  cursor: pointer;
}

.product-item-link:has(>.seller:hover) .product-item-wrapper,
.product-item-link:has(>.buyer:hover) .product-item-wrapper {
  opacity: .4;
  box-shadow: 3px 0 13px 0 var(--dark-blue, 0.1);
}
</style>
