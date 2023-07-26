<script setup lang="ts">
import Logo from '@/components/header/Logo.vue'
import NavSearch from '@/components/header/NavSearch.vue'
import NavList from '@/components/header/NavList.vue'
import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()

defineProps<{
  searchbar: boolean,
  userId: number
}>()
</script>

<template>
  <header>
    <div class="nav-container">
      <div class="nav-wrapper d-flex flex-row justify-content-around align-content-center">
        <router-link to="/" @click="queryStringStore.handleClearAll">
          <div class="nav-logo-wrapper d-flex flex-row">
            <Logo />
            <h5 class="nav-name">Shop</h5>
          </div>
        </router-link>
        <NavSearch v-if="searchbar" :userId="userId" />
        <NavList />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.nav-container {
  @extend %standard-boxshadow;
  min-width: 765px;
}

.nav-wrapper {
  height: 80px;
  padding: 10px;
  min-width: 600px;
  max-width: 1200px;
  margin: 0 auto
}

a {
  @extend %standard-href;

  &:hover {
    text-decoration: none;
  }
}

.nav-name {
  margin: 0 15px;
}
</style>