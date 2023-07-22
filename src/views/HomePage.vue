<script setup lang="ts">

import Header from '@/components/header/Header.vue'
import ProductList from '@/components/product/ProductList.vue'
import SideBar from '@/components/form/SideBar.vue'

</script>

<template>
  <Header />
  <main class="container">
    <section class="side-bar">
      <SideBar />
    </section>
    <section class="product-list">
      <ProductList />
    </section>
  </main>
</template>

<style lang="scss">
.container {
  display: flex;
  justify-content: space-evenly;
}

.side-bar {
  width: 20%;
}

.product-list {
  width: 70%;
  background-color: white;
  border-radius: 5px;
}
</style>