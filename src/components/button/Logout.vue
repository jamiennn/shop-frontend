<script setup lang="ts">
import { useAuthenticator } from '@/stores/authenticator';
const authenticator = useAuthenticator()
import Swal from 'sweetalert2'
import { successToast } from '@/helper/toast.js'

</script>

<template>
  <li class="text-center">
    <button @click="authenticator.logout" class="btn-logout">logout</button>
  </li>
</template>

<style lang="scss">
@import '../../assets/main.scss';

.btn-logout {
  @extend %standard-button
}
</style>