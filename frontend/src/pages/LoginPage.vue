<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const appTitle = computed(() => import.meta.env.VITE_APP_TITLE ?? 'App Starter')

const form = reactive({
  account: 'demo',
  password: 'demo',
})

async function onSubmit() {
  try {
    await authStore.loginDemo(form.account, form.password)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    router.push(redirect)
  } catch (e) {
    ElMessage.error(e instanceof Error ? e.message : '登录失败')
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <div class="brand">
        <div class="mark">A</div>
        <div>
          <div class="name">{{ appTitle }}</div>
          <div class="sub">基础框架 Demo 登录</div>
        </div>
      </div>

      <el-form label-position="top" class="form" @submit.prevent="onSubmit">
        <el-form-item label="账号">
          <el-input v-model="form.account" size="large" autocomplete="username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" size="large" type="password" show-password autocomplete="current-password" />
        </el-form-item>
        <el-button type="primary" size="large" class="submit" @click="onSubmit">登录</el-button>
        <div class="hint">示例页：点击登录会写入 demo token 并返回。</div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: calc(100vh - 64px);
  display: grid;
  place-items: center;
  padding: 22px 0 26px;
}

.card {
  width: min(420px, calc(100vw - 36px));
  border: 1px solid rgba(2, 6, 23, 0.08);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.78);
  padding: 18px 18px 16px;
  box-shadow: 0 18px 42px rgba(2, 6, 23, 0.08);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.mark {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 900;
  background: linear-gradient(135deg, #6366f1, #22c55e);
}

.name {
  font-weight: 900;
  font-size: 16px;
}

.sub {
  margin-top: 2px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
}

.submit {
  width: 100%;
  margin-top: 4px;
}

.hint {
  margin-top: 10px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
  line-height: 1.4;
}
</style>
