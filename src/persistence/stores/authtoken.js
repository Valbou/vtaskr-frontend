import { ref } from 'vue'
import { defineStore } from 'pinia'

export const authTokenStore = defineStore('authToken', () => {
  const token = ref(0)
  function getToken() {
    token.value++
  }

  return { token, getToken }
})
