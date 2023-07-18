<script setup lang="ts">
import { useAuthenticator } from '@/stores/authenticator';
const authenticator = useAuthenticator()
import Swal from 'sweetalert2'

const handleLogout = () => {
  authenticator.logout()
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Log out successfully.',
    showConfirmButton: false,
    timer: 1500
  })
}
</script>

<template>
  <li class="text-center">
    <button @click="handleLogout" class="btn-logout">logout</button>
  </li>
</template>

<style lang="scss">
@import '../../assets/main.scss';

.btn-logout {
  @extend %standard-button
}
</style>