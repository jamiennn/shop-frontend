<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()
const keyword = ref(queryStringStore.keyword || '')

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
      <input type="text" class="nav-search-input" maxlength="15" v-model="keyword" @keyup.enter="handleSubmit">
      <button class="btn-search" @click="handleSubmit">
        <p class="search-icon">search</p>
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
  margin-left: 10px;
}
</style>