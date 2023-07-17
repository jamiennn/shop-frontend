<script setup lang="ts">
import { useAuthenticator } from '@/stores/authenticator';
const authenticator = useAuthenticator()
</script>

<template>
  <h1>home page</h1>
  <button @click="authenticator.logout">logout</button>
</template>