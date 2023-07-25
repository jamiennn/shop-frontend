<script setup lang="ts">
import { useAuthenticator } from '@/stores/authenticator';
const authenticator = useAuthenticator()
import Swal from 'sweetalert2'
import { successToast } from '@/helper/toast.js'
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

#tooltip-logout {
  top: 35px;
}
</style>