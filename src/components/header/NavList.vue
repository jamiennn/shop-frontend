<script setup lang="ts">
import NavItem from '@/components/header/NavItem.vue'

</script>
<template>
  <ul class="nav-list-wrapper">
    <NavItem role="buyer" />
  </ul>
</template>

<style lang="scss">
.nav-list-wrapper {
  display: flex;
  align-items: center;
  height: 100%
}
</style>