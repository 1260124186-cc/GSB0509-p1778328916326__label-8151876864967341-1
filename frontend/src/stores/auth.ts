import { defineStore } from 'pinia'
import { getToken, setToken } from '../utils/token'

export type AuthUser = {
  id: string
  name: string
  email?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: getToken(),
    user: null as AuthUser | null,
  }),
  getters: {
    isAuthed: (s) => Boolean(s.token),
  },
  actions: {
    setToken(token: string | null) {
      this.token = token
      setToken(token)
    },
    logout() {
      this.setToken(null)
      this.user = null
    },
    async loginDemo(account: string, password: string) {
      if (!account.trim() || !password.trim()) throw new Error('请输入账号与密码')
      this.setToken('demo-token')
      this.user = { id: 'demo', name: 'Demo User', email: 'demo@example.com' }
    },
  },
})
