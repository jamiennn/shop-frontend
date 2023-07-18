<script setup lang="ts">
import { inject } from 'vue'
import Logo from '@/components/header/Logo.vue'
import NavSearch from '@/components/header/NavSearch.vue'
import NavList from '@/components/header/NavList.vue'

const emit = defineEmits(['update:modelValue'])

let status = inject('status')

</script>

<template>
  <header>
    <div class="nav-wrapper d-flex flex-row justify-content-around align-content-center">
      <a href="/">
        <div class="nav-logo-wrapper d-flex flex-row">
          <Logo />
          <h5 class="nav-name">Shop</h5>
        </div>
      </a>
      <NavSearch />
      <NavList />
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '../../assets/main.scss';

.nav-wrapper {
  position: sticky;
  height: 80px;
  padding: 10px;
  min-width: 600px;
  @extend %standard-boxshadow
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