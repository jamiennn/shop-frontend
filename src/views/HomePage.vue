<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/header/Header.vue'
import ProductList from '@/components/product/ProductList.vue'
import SideBar from '@/components/form/SideBar.vue'
const route = useRoute()
const uid = ref(Number(route.params.uid))

watch(route, () => {
  uid.value = Number(route.params.uid)
})

</script>

<template>
  <Header :searchbar="true" />
  <main class="container">
    <section class="side-bar">
      <SideBar />
    </section>
    <section class="product-list">
      <h1 v-if="uid">商品清單</h1>
      <ProductList :sellerId="uid" />
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