<script setup lang="ts">
import MixerIcon from '@/assets/images/MixerIcon.vue'
</script>
<template>
  <div class="logo-container text-center">
    <MixerIcon class="logo" alt="logo" />
  </div>
</template>

<style lang="scss">
.logo-container {
  height: 40px;
  width: 40px;
  margin: 0 auto;
  margin-bottom: 29px;

  .logo {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
    height: 40px;
    width: 40px;
    object-fit: unset;
  }
}
</style>