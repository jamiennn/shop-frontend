import { ref } from 'vue'
import { defineStore } from "pinia"

export const useModeStore = defineStore('modeStore', () => {
  const hamChecked = ref(false)
  const sideBarOpen = ref(false)

  const changeHam = () => {
    hamChecked.value = !hamChecked.value
  }

  const changeSideBar = () => {
    sideBarOpen.value = !sideBarOpen.value
  }

  return {
    hamChecked,
    sideBarOpen,
    changeHam,
    changeSideBar
  }
})