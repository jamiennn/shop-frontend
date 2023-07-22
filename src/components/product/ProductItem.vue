<script setup lang="ts">
import { watch, reactive, ref } from 'vue'
import Placeholder from '@/assets/images/MixerIcon-placeholder.vue'
import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()
const products = reactive({})
const isLoaded = ref(false)

// 監控 query string store，更新 products
watch(queryStringStore, async () => {
  const data = await queryStringStore.handleHomePage()
  const newProducts = data?.products
  for (let p in products) delete products[p]

  Object.assign(products, newProducts)
}, { immediate: true })

</script>

<template>
  <router-link v-for="(product, i) in products" :key="i" :to="`/products/${product.id}`" class="product-item-link">

    <div class="product-item-wrapper">
      <div class="product-image-wrapper">
        <img v-show="isLoaded" :src="product.image" :alt="product.name" class="product-image"
          @load="() => isLoaded = true">
        <Placeholder v-show="!isLoaded" class="product-image placeholder" />
      </div>
      <div class="product-name">
        {{ product.name }}
      </div>
      <div class="product-price">${{ product.price }}</div>
    </div>

    <button class="btn-add-product" id="btn-add-product">
      cart
    </button>
  </router-link>
</template>

<style scoped lang="scss">
@import '../../assets/main.scss';

.product-item-link {
  display: block;
  position: relative;
  margin: 8px 4px;

  color: black;
  width: 150px;

  .product-item-wrapper {
    width: 150px;
    height: 250px;
    background-color: var(--gray);
    // border-radius: 15px;
    overflow: hidden;
    @extend %standard-boxshadow;

    &:hover {
      opacity: .6;
      box-shadow: 3px 0 13px 0 var(--dark-blue, 0.1);
    }


    .product-image-wrapper {
      position: relative;
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

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

.btn-add-product {
  display: none;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.product-item-link:hover>#btn-add-product {
  display: block;
  background-color: red;
  cursor: pointer;
}

.product-item-wrapper:has(~ #btn-add-product:hover) {
  opacity: .6;
  box-shadow: 3px 0 13px 0 var(--dark-blue, 0.1);
}
</style>
