<script setup lang="ts">
import NavItem from '@/components/header/NavItem.vue'
import { useAuthenticator } from '@/stores/authenticator'
const authenticator = useAuthenticator()
</script>
<template>
  <ul class="nav-list-wrapper">
    <NavItem :role="authenticator.role" :user="authenticator?.currentMember" />
  </ul>
</template>

<style lang="scss">
.nav-list-wrapper {
  display: flex;
  align-items: center;
  height: 100%
}
</style>