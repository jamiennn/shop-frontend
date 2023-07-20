<script setup lang="ts">
import { watch, ref } from 'vue'
import ProductItem from '@/components/product/ProductItem.vue'
import Paginator from '@/components/Paginator.vue'
import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()

// 監控 input
const productListKey = ref('')

// 監控 query string store，若有變化要重新 render 此面板
watch(queryStringStore, async () => {
  productListKey.value = queryStringStore.getProductListKey()
}, { immediate: true })

</script>
<template>
  <div class="product-list-wrapper" id="product-list-wrapper" :key="productListKey">
    <ProductItem />
  </div>
  <Paginator />
</template>

<style scoped lang="scss">
@import '../../assets/main.scss';

.product-list-wrapper {
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-gap: 5px;
  justify-content: space-evenly;
}
</style>
