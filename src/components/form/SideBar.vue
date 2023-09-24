<script setup lang="ts">

import SearchPrice from '@/components/form/SearchPrice.vue'
import SearchCategory from '@/components/form/SearchCategory.vue'
import { reactive, watch, ref, provide, computed } from 'vue';
import { useQueryStringStore } from '@/stores/queryString'
import { useModeStore } from '@/stores/mode'
const modeStore = useModeStore()
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

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

function handleOpenSideBar() {
  modeStore.changeSideBar()
}

const titleStyle = computed(() => {
  return {
    "side-bar-title": true,
    "triangle-close": !modeStore.sideBarOpen && width.value <= 480,
    "triangle-open": modeStore.sideBarOpen && width.value <= 480
  }
})

const sideBarStyle = computed(() => {
  return !modeStore.sideBarOpen && width.value <= 480 ? "side-bar-wrapper-close" : "side-bar-wrapper-open"
})
</script>

<template>
  <div>
    <div :class="titleStyle" @click="handleOpenSideBar">
      篩選條件
    </div>
  </div>
  <div class="relative">
    <div :class="sideBarStyle">
      <SearchPrice v-model:priceMin="sideInput.priceMin" v-model:priceMax="sideInput.priceMax" />
      <SearchCategory v-model:checked="sideInput.checked" />
      <div class="btn-search-price-wrapper">
        <button class="btn-search-price" @click="handleSubmit">套用</button>
        <button class="btn-search-price" @click="handleClearSearch">清除條件</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.side-bar-title {
  padding: 5px;
  color: var(--blue);
  font-size: 18px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
}

.triangle-close::before {
  display: inline-block;
  content: '';
  border-style: solid;
  border-color: transparent transparent transparent var(--blue);
  border-width: 6px 0px 6px 8px;
}

.triangle-open::before {
  display: inline-block;
  content: '';
  border-style: solid;
  border-color: var(--blue) transparent transparent transparent;
  border-width: 8px 6px 0px 6px;
}

.relative {
  position: relative;
}

.side-bar-wrapper-close {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5px;
  transform: scale(0, 0);
}

.side-bar-wrapper-open {
  position: relative;
  padding: 5px;
  transform-origin: top;
  transition: transform .3s ease-in-out;
  transform: scale(1, 1);
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
  .side-bar-title:hover {
    cursor: auto;
  }

  .btn-search-price {
    width: 100%
  }
}
</style>
