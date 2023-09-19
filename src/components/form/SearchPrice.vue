<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQueryStringStore } from '@/stores/queryString'

// 監控 input
const queryStringStore = useQueryStringStore()
const priceMin = ref(queryStringStore.priceMin || '')
const priceMax = ref(queryStringStore.priceMax || '')

// 將 input 更新至 store
function handleSubmit() {
  queryStringStore.handlePriceRange(priceMin.value, priceMax.value)
}

// 如果使用者沒有點擊套用金額，就點搜尋(透過 query string store 可知)，把input淨空
watch(queryStringStore, () => {
  priceMin.value = queryStringStore.priceMin
  priceMax.value = queryStringStore.priceMax
})
</script>
<template>
  <div class="search-price-wrapper">
    <div class="search-price-title">金額</div>
    <div class="search-price-input-wrapper">
      <input type="number" class="search-price-input" min="0" max="999999" v-model="priceMin">
      <span class="tilde">～</span>
      <input type="number" class="search-price-input" min="0" max="999999" v-model="priceMax">
    </div>
  </div>
  <div class="btn-search-price-wrapper">
    <button class="btn-search-price" @click="handleSubmit">套用</button>
    <button class="btn-search-price" @click="queryStringStore.handleClearSearch">清除條件</button>
  </div>
</template>

<style lang="scss">
.search-price-wrapper {
  width: 100%
}

.search-price-title {
  margin-left: 15px;
}

.search-price-input-wrapper {
  text-align: center
}

.search-price-input {
  @extend %input-style;
  margin: 10px 0 0 0;
  height: 80%;
  width: 45%;
  height: 100%;
  background-color: var(--form-gray);
  font-size: 10px
}

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

  .search-price-title {
    margin-left: 0px;
  }

  .search-price-input-wrapper {
    text-align: start
  }

  .btn-search-price {
    width: 100%
  }

}
</style>