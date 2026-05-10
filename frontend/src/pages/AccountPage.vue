<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const displayName = computed(() => authStore.user?.name ?? 'Guest')
const email = computed(() => authStore.user?.email ?? 'guest@example.com')

const profileForm = ref({
  name: displayName.value,
  email: email.value,
  bio: '这里是可替换的账号页示例。',
})
</script>

<template>
  <div class="page">
    <div class="head">
      <div>
        <div class="title">账号</div>
        <div class="sub">示例账号页：卡片式信息结构与表单布局。</div>
      </div>
      <div class="actions">
        <el-button @click="router.push('/login')">去登录</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </div>

    <el-row :gutter="12">
      <el-col :xs="24" :md="8">
        <el-card class="panel" shadow="never">
          <div class="userCard">
            <el-avatar :size="56">{{ displayName.slice(0, 1).toUpperCase() }}</el-avatar>
            <div class="userInfo">
              <div class="userName">{{ displayName }}</div>
              <div class="userMeta">{{ email }}</div>
            </div>
          </div>
          <div class="stats">
            <div class="stat">
              <div class="statNum">0</div>
              <div class="statLabel">待办</div>
            </div>
            <div class="stat">
              <div class="statNum">0</div>
              <div class="statLabel">通知</div>
            </div>
            <div class="stat">
              <div class="statNum">0</div>
              <div class="statLabel">收藏</div>
            </div>
          </div>
          <div class="hint">把这里替换成你的业务统计数据。</div>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="16">
        <el-card class="panel" shadow="never">
          <template #header>
            <div class="panelTitle">基础资料</div>
          </template>
          <el-form label-position="top" class="form">
            <el-form-item label="昵称">
              <el-input v-model="profileForm.name" size="large" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="profileForm.email" size="large" />
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="profileForm.bio" type="textarea" :rows="4" />
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="panel" shadow="never">
          <template #header>
            <div class="panelTitle">偏好设置</div>
          </template>
          <div class="prefs">
            <div class="prefRow">
              <div>
                <div class="prefTitle">通知</div>
                <div class="prefSub">接入后端或消息推送后可生效。</div>
              </div>
              <el-switch />
            </div>
            <div class="prefRow">
              <div>
                <div class="prefTitle">自动保存</div>
                <div class="prefSub">演示开关组件在表单中的使用方式。</div>
              </div>
              <el-switch />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 24px;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.title {
  font-size: 18px;
  font-weight: 900;
}

.sub {
  margin-top: 2px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.62);
}

.actions {
  display: flex;
  gap: 10px;
}

.panel {
  border-radius: 18px;
  border: 1px solid rgba(2, 6, 23, 0.08);
  background: rgba(255, 255, 255, 0.75);
  margin-bottom: 12px;
}

.panelTitle {
  font-weight: 900;
}

.userCard {
  display: flex;
  align-items: center;
  gap: 12px;
}

.userName {
  font-weight: 900;
  font-size: 16px;
}

.userMeta {
  margin-top: 2px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
}

.stats {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.stat {
  border: 1px solid rgba(2, 6, 23, 0.06);
  border-radius: 14px;
  padding: 10px 12px;
  background: rgba(248, 250, 252, 0.7);
}

.statNum {
  font-weight: 900;
  font-size: 18px;
}

.statLabel {
  margin-top: 2px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
}

.hint {
  margin-top: 12px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
  line-height: 1.4;
}

.form {
  max-width: 760px;
}

.prefs {
  display: grid;
  gap: 10px;
}

.prefRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(2, 6, 23, 0.06);
  border-radius: 14px;
  background: rgba(248, 250, 252, 0.7);
}

.prefTitle {
  font-weight: 800;
}

.prefSub {
  margin-top: 2px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
}
</style>
