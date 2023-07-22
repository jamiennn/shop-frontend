import { ref } from 'vue'
import { defineStore } from 'pinia'

import router from '@/router';
import { loginApi, testTokenApi } from '@/api/user.js'
import { successToast } from '@/helper/toast.js'

export const useAuthenticator = defineStore('authenticator', () => {
  const isAuthenticated = ref(false)
  const currentMember = ref(null)
  const role = ref('')

  const login = async (account, password) => {
    try {
      const { success, messages } = await loginApi(account, password)

      if (success) {
        const { loginUser, token } = messages
        localStorage.setItem('authToken', token)


        if (!isAuthenticated.value || !currentMember.value) {
          isAuthenticated.value = true
          currentMember.value = loginUser
        }

        return { success }
      } else {
        if (isAuthenticated.value || currentMember.value) {
          isAuthenticated.value = false
          currentMember.value = null
        }

        return { success, messages }
      }

    } catch (e) {
      console.error(e)
    }
  }
  const logout = () => {
    localStorage.removeItem('authToken')
    isAuthenticated.value = false
    currentMember.value = null
    router.push('/')
    successToast(
      'success',
      'Log out successfully.'
    )
  }
  const checkPermission = async (authToken) => {
    try {
      const { success, messages } = await testTokenApi(authToken)

      if (success) {
        if (!isAuthenticated.value || !currentMember.value) {
          isAuthenticated.value = true
          currentMember.value = messages.loginUser
        }
        return { success }
      } else {
        if (isAuthenticated.value || currentMember.value) {
          isAuthenticated.value = false
          currentMember.value = null
        }
        return { success, messages }
      }
    } catch (e) {
      console.error(e)
    }
  }

  return {
    isAuthenticated,
    currentMember,
    role,
    login,
    logout,
    checkPermission
  }
})