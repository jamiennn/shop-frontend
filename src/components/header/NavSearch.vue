<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQueryStringStore } from '@/stores/queryString'
import Search from '@/assets/images/Search.vue'

const queryStringStore = useQueryStringStore()
const keyword = ref(queryStringStore.keyword || '')

defineProps<{
  userId: number
}>()

function handleSubmit() {
  queryStringStore.handleSearchKeyword(keyword.value)
}
watch(queryStringStore, () => {
  keyword.value = queryStringStore.keyword
})
</script>
<template>
  <div class="nav-search-wrapper">
    <div class="nav-search-input-wrapper">
      <input type="text" class="nav-search-input" maxlength="15" v-model="keyword" @keyup.enter="handleSubmit"
        :placeholder="userId ? '在此商店搜尋' : ''">
      <button class="btn-search" @click="handleSubmit">
        <Search class="btn-product btn-search-product" />
        <span class="tooltip tooltip-delete">搜尋</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.nav-search-wrapper {
  height: 50px;
  width: 40%
}

.nav-search-input-wrapper {
  @extend %input-style;
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0 0;
  height: 80%;
}

.nav-search-input {
  width: 70%;
  height: 100%;
  border: 0px;
  background-color: var(--form-gray);
}

.btn-search {
  @extend %standard-button;
  position: relative;

  .btn-product {
    width: 15px;
    height: 15px;
  }

  .tooltip {
    @extend %standard-tooltip
  }

  &:hover .tooltip {
    opacity: 1;
    transition: all .4s ease-out;
  }
}

/////////////////電腦版/////////////////
@media screen and (min-width: 480px) {
  .nav-search-wrapper {
    width: 40%
  }
}
</style>