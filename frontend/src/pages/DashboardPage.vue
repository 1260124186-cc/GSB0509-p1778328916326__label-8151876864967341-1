<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()

const appTitle = computed(() => import.meta.env.VITE_APP_TITLE ?? 'App Starter')
</script>

<template>
  <div class="page">
    <section class="hero">
      <div class="hero__left">
        <div class="hero__badge">
          <span class="dot" />
          <span>基础框架示例页</span>
        </div>
        <h1 class="hero__title">{{ appTitle }}</h1>
        <p class="hero__desc">
          这里提供一套通用脚手架：布局、路由、鉴权、请求封装、状态管理与工程化配置。示例页面可随时删除或替换成你的业务模块。
        </p>
        <div class="hero__actions">
          <el-button type="primary" size="large" @click="router.push('/examples')">
            查看示例模块
            <el-icon class="ml-6"><ArrowRight /></el-icon>
          </el-button>
          <el-button size="large" @click="router.push('/account')">账号示例</el-button>
        </div>
      </div>

      <div class="hero__right">
        <div class="cards">
          <el-card shadow="never" class="card">
            <div class="cardTitle">内置能力</div>
            <div class="pillGrid">
              <el-tag effect="light" round>Vue 3</el-tag>
              <el-tag effect="light" round>Vite</el-tag>
              <el-tag effect="light" round>TypeScript</el-tag>
              <el-tag effect="light" round>Pinia</el-tag>
              <el-tag effect="light" round>Vue Router</el-tag>
              <el-tag effect="light" round>Axios</el-tag>
              <el-tag effect="light" round>Element Plus</el-tag>
            </div>
          </el-card>

          <el-card shadow="never" class="card">
            <div class="cardTitle">下一步建议</div>
            <div class="list">
              <div class="row">
                <div class="rowMain">新增业务模块</div>
                <div class="rowSub">在 pages 或 modules 下新增页面与路由。</div>
              </div>
              <div class="row">
                <div class="rowMain">替换鉴权逻辑</div>
                <div class="rowSub">将 demo 登录替换为真实 API 调用。</div>
              </div>
              <div class="row">
                <div class="rowMain">对接后端</div>
                <div class="rowSub">配置 VITE_API_BASE_URL 并复用统一请求层。</div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 12px;
  align-items: start;
  padding: 12px 0 8px;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(2, 6, 23, 0.08);
  background: rgba(255, 255, 255, 0.75);
  color: rgba(15, 23, 42, 0.82);
  font-size: 12px;
  font-weight: 600;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, #6366f1, #22c55e);
}

.hero__title {
  margin: 14px 0 10px;
  font-size: 40px;
  line-height: 1.1;
  letter-spacing: -0.6px;
}

.hero__desc {
  margin: 0;
  color: rgba(15, 23, 42, 0.72);
  font-size: 14px;
  max-width: 60ch;
}

.hero__actions {
  margin-top: 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.ml-6 {
  margin-left: 6px;
}

.cards {
  display: grid;
  gap: 12px;
}

.card {
  border-radius: 18px;
  border: 1px solid rgba(2, 6, 23, 0.08);
  background: rgba(255, 255, 255, 0.78);
}

.cardTitle {
  font-weight: 900;
  margin-bottom: 10px;
}

.pillGrid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.list {
  display: grid;
  gap: 10px;
}

.rowMain {
  font-weight: 800;
}

.rowSub {
  margin-top: 2px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.62);
}

@media (max-width: 1080px) {
  .hero {
    grid-template-columns: 1fr;
  }
  .hero__title {
    font-size: 34px;
  }
}

@media (max-width: 640px) {
  .hero__title {
    font-size: 28px;
  }
}
</style>
