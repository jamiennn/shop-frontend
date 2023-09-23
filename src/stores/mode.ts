import { ref } from 'vue'
import { defineStore } from "pinia"

export const useModeStore = defineStore('modeStore', () => {
  const hamChecked = ref(false)

  const changeHam = () => {
    hamChecked.value = hamChecked.value === false ? true : false
  }

  return {
    hamChecked,
    changeHam
  }
})