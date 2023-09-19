<script setup lang="ts">
import { useAuthenticator } from '@/stores/authenticator';
const authenticator = useAuthenticator()

import LogoutIcon from '@/assets/images/Logout.vue'

</script>

<template>
  <li class="text-center">
    <button @click="authenticator.logout" class="btn-logout nav-list-icon">
      <LogoutIcon class="btn-product" />
      <span class="tooltip" id="tooltip-logout">登出</span>
    </button>
  </li>
</template>

<style lang="scss">
.btn-logout {
  @extend %standard-button;
}

@media screen and (min-width: 480px) {
  .nav-toggle:checked~.nav-list-wrapper>.nav-list #tooltip-logout {
    opacity: 0;
    top: 35px;
    right: 0;
  }
}
</style>