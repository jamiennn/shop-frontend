<script setup lang="ts">
import { watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

import { useModeStore } from '@/stores/mode'
const modeStore = useModeStore()

watch(width, () => {
  if (width.value > 480) {
    modeStore.hamChecked = false
  }
})

</script>

<template>
  <div v-if="modeStore.hamChecked" class="dark"></div>
</template>

<style scoped lang="scss">
.dark {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 375px;
  background-color: gray;
  opacity: .5;
  z-index: 2
}
</style>