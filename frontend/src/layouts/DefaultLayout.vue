<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { HomeFilled, List, User, Menu as MenuIcon, Search } from '@element-plus/icons-vue'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const mobileNavOpen = ref(false)

const activePath = computed(() => {
  if (route.path.startsWith('/examples')) return '/examples'
  return route.path
})

const displayName = computed(() => authStore.user?.name ?? 'Guest')
const avatarText = computed(() => {
  const s = displayName.value.trim()
  return s ? s.slice(0, 1).toUpperCase() : 'U'
})

const appTitle = computed(() => import.meta.env.VITE_APP_TITLE ?? 'App Starter')

function onAvatarCommand(command: 'account' | 'logout' | 'login') {
  if (command === 'account') router.push('/account')
  if (command === 'login') router.push('/login')
  if (command === 'logout') {
    authStore.logout()
    router.push('/login')
  }
}
</script>

<template>
  <el-container class="layout">
    <el-aside class="aside">
      <div class="brand">
        <div class="brand__mark">A</div>
        <div class="brand__text">
          <div class="brand__name">{{ appTitle }}</div>
          <div class="brand__sub">Vue 3 • Vite • TypeScript</div>
        </div>
      </div>

      <el-menu :default-active="activePath" router class="menu" background-color="transparent">
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="/examples">
          <el-icon><List /></el-icon>
          <span>示例</span>
        </el-menu-item>
        <el-menu-item index="/account">
          <el-icon><User /></el-icon>
          <span>账号</span>
        </el-menu-item>
      </el-menu>

      <div class="aside__footer">
        <div class="aside__tip">你正在使用 Vue 3 + Element Plus + TypeScript 的基础框架</div>
      </div>
    </el-aside>

    <el-container class="main">
      <el-header class="header">
        <div class="header__left">
          <el-button class="header__burger" :icon="MenuIcon" circle @click="mobileNavOpen = true" />
          <div class="header__title">{{ route.meta.title ?? appTitle }}</div>
        </div>

        <div class="header__right">
          <el-input class="header__search" placeholder="搜索 / 快捷跳转" size="large">
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-dropdown trigger="click" @command="onAvatarCommand">
            <el-avatar class="header__avatar" :size="34">{{ avatarText }}</el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="authStore.isAuthed" command="account">账号页</el-dropdown-item>
                <el-dropdown-item v-if="authStore.isAuthed" divided command="logout">退出登录</el-dropdown-item>
                <el-dropdown-item v-else command="login">去登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>

  <el-drawer v-model="mobileNavOpen" size="280px" direction="ltr" :with-header="false">
    <div class="drawer">
      <div class="brand brand--drawer">
        <div class="brand__mark">A</div>
        <div class="brand__text">
          <div class="brand__name">{{ appTitle }}</div>
          <div class="brand__sub">Vue 3 • Vite • TypeScript</div>
        </div>
      </div>
      <el-menu :default-active="activePath" router class="menu" @select="mobileNavOpen = false">
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="/examples">
          <el-icon><List /></el-icon>
          <span>示例</span>
        </el-menu-item>
        <el-menu-item index="/account">
          <el-icon><User /></el-icon>
          <span>账号</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-drawer>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}

.aside {
  width: 260px;
  padding: 20px 14px 16px;
  border-right: 1px solid rgba(2, 6, 23, 0.08);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(14px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px 14px;
}

.brand__mark {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #22c55e);
  box-shadow: 0 10px 28px rgba(99, 102, 241, 0.25);
}

.brand__name {
  font-weight: 800;
  font-size: 16px;
  letter-spacing: 0.2px;
}

.brand__sub {
  margin-top: 2px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
}

.menu {
  border-right: none;
  padding: 4px;
}

.aside__footer {
  margin-top: auto;
  padding: 14px 10px 0;
}

.aside__tip {
  font-size: 12px;
  color: rgba(15, 23, 42, 0.6);
  line-height: 1.4;
}

.main {
  min-width: 0;
}

.header {
  height: 64px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(2, 6, 23, 0.08);
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(16px);
}

.header__left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.header__title {
  font-weight: 700;
  color: rgba(15, 23, 42, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__search {
  width: min(420px, 48vw);
}

.content {
  padding: 20px 18px 28px;
}

.header__burger {
  display: none;
}

.drawer {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.brand--drawer {
  padding: 18px 6px 12px;
}

@media (max-width: 920px) {
  .aside {
    display: none;
  }
  .header__burger {
    display: inline-flex;
  }
  .header__search {
    width: min(340px, 46vw);
  }
}

@media (max-width: 520px) {
  .header__search {
    display: none;
  }
}
</style>
