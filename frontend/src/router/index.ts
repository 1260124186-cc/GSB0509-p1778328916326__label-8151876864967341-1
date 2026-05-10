import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/token'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../pages/DashboardPage.vue'),
          meta: { title: '仪表盘' },
        },
        {
          path: 'examples',
          name: 'examples',
          component: () => import('../pages/ExamplesPage.vue'),
          meta: { title: '示例' },
        },
        {
          path: 'examples/:id',
          name: 'example-detail',
          component: () => import('../pages/ExampleDetailPage.vue'),
          meta: { title: '示例详情' },
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('../pages/AccountPage.vue'),
          meta: { title: '账号' },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage.vue'),
      meta: { title: '登录', public: true },
    },
  ],
})

router.beforeEach((to) => {
  const token = getToken()
  if (to.meta.public) return true
  if (token) return true
  return { path: '/login', query: { redirect: to.fullPath } }
})

router.afterEach((to) => {
  const base = import.meta.env.VITE_APP_TITLE ?? 'App Starter'
  const title = typeof to.meta.title === 'string' && to.meta.title.trim() ? to.meta.title : ''
  document.title = title ? `${title} - ${base}` : base
})

export default router
