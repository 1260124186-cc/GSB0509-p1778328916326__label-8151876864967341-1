import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'
import { clearToken, getToken } from '../utils/token'

export type ApiEnvelope<T> = {
  code: number
  message: string
  data: T
}

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 15_000,
})

function normalizeErrorMessage(error: AxiosError): string {
  const status = error.response?.status
  const data = error.response?.data as any

  if (typeof data?.message === 'string' && data.message.trim()) return data.message
  if (status === 401) return '登录已过期，请重新登录'
  if (status === 403) return '没有权限访问该资源'
  if (status === 404) return '请求资源不存在'
  if (status && status >= 500) return '服务器繁忙，请稍后再试'
  if (error.code === 'ECONNABORTED') return '请求超时，请检查网络'
  return '网络异常，请稍后再试'
}

instance.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const msg = normalizeErrorMessage(error)
    ElMessage.error(msg)

    if (error.response?.status === 401) {
      clearToken()
      if (router.currentRoute.value.path !== '/login') {
        await router.push('/login')
      }
    }
    return Promise.reject(error)
  },
)

export async function request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
  const res = await instance.request<T>(config)
  return res.data
}

export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) => request<T>({ ...config, url, method: 'GET' }),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => request<T>({ ...config, url, data, method: 'POST' }),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => request<T>({ ...config, url, data, method: 'PUT' }),
  delete: <T>(url: string, config?: AxiosRequestConfig) => request<T>({ ...config, url, method: 'DELETE' }),
  raw: instance,
}
