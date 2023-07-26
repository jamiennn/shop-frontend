<script setup lang="ts">
import { watch, ref } from 'vue'
import ProductItem from '@/components/product/ProductItem.vue'
import Paginator from '@/components/Paginator.vue'
import Loading from '@/components/spinner/Loading.vue'
import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()

// 監控 input
const productListKey = ref('')
const dataReady = ref(false)

// 監控 query string store，若有變化要重新 render 此面板
watch(queryStringStore, async () => {
  dataReady.value = false
  productListKey.value = queryStringStore.getProductListKey()
}, { immediate: true })

defineProps<{
  sellerId: number
}>()
</script>
<template>
  <div v-show="dataReady" class="product-list-wrapper" id="product-list-wrapper" :key="productListKey">
    <ProductItem :sellerId="sellerId" v-model="dataReady" />
  </div>
  <div v-show="!dataReady" class="loading-wrapper">
    <div class="loading-text">Loading</div>
    <Loading />
  </div>
  <Paginator />
</template>

<style scoped lang="scss">
.product-list-wrapper {
  margin: 20px;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 10px;
  justify-content: space-evenly;
}

.loading-text {
  @extend %standard-title;
  margin-bottom: 20px;
}

.loading-wrapper {
  margin: 20px;
  padding: 10px;
  text-align: center;
}
</style>
