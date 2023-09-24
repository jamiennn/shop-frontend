<script setup lang="ts">

import SearchPrice from '@/components/form/SearchPrice.vue'
import SearchCategory from '@/components/form/SearchCategory.vue'
import { reactive, watch, ref, provide } from 'vue';
import { useQueryStringStore } from '@/stores/queryString'

const status = ref('')
provide('status', status)

// 監控 input
const queryStringStore = useQueryStringStore()
const sideInput = reactive({
  priceMin: queryStringStore.priceMin || '',
  priceMax: queryStringStore.priceMax || '',
  checked: queryStringStore.categories || []
})

// 如果使用者沒有點擊套用金額，就點搜尋(透過 query string store 可知)，把input淨空
watch(queryStringStore, () => {
  sideInput.priceMin = queryStringStore.priceMin
  sideInput.priceMax = queryStringStore.priceMax
})

// 將子元件傳來的 input 更新至 store
function handleSubmit() {
  queryStringStore.handlePriceRange(sideInput.priceMin, sideInput.priceMax)
  queryStringStore.handleAddCategory(sideInput.checked)
}

function handleClearSearch() {
  for (let item of sideInput.checked) item.isChecked = false
  queryStringStore.handleClearSearch()
}
</script>

<template>
  <div class="side-bar-wrapper">

    <SearchPrice v-model:priceMin="sideInput.priceMin" v-model:priceMax="sideInput.priceMax" />
    <SearchCategory v-model:checked="sideInput.checked" />

    <div class="btn-search-price-wrapper">
      <button class="btn-search-price" @click="handleSubmit">套用</button>
      <button class="btn-search-price" @click="handleClearSearch">清除條件</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.side-bar-wrapper {
  padding: 5px;
}

.btn-search-price-wrapper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 10px
}

.btn-search-price {
  @extend %standard-button;
  width: 40%;
  margin-top: 20px;
}

@media screen and (min-width: 480px) {
  .btn-search-price {
    width: 100%
  }
}
</style>
