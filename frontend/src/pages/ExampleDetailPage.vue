<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getExampleItemById } from '../data/examples'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const id = computed(() => String(route.params.id ?? ''))
const item = computed(() => getExampleItemById(id.value))

const form = ref({
  name: '',
  summary: '',
})

const isInitialized = ref(false)

watch(
  item,
  (v) => {
    if (isInitialized.value) return
    if (!v) return
    form.value.name = v.name
    form.value.summary = v.summary
    isInitialized.value = true
  },
  { immediate: true },
)

function onSave() {
  ElMessage.success('保存成功（示例）')
}
</script>

<template>
  <div class="page">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item @click="router.push('/')">Dashboard</el-breadcrumb-item>
      <el-breadcrumb-item @click="router.push('/examples')">Examples</el-breadcrumb-item>
      <el-breadcrumb-item>Detail</el-breadcrumb-item>
    </el-breadcrumb>

    <el-empty v-if="!item" description="数据不存在" />

    <div v-else class="content">
      <div class="hero">
        <div class="heroMain">
          <div class="titleRow">
            <div class="title">{{ item.name }}</div>
            <el-tag effect="light" round>{{ item.status }}</el-tag>
          </div>
          <div class="summary">{{ item.summary }}</div>
          <div class="tags">
            <el-tag v-for="t in item.tags" :key="t" effect="plain" size="small" round>{{ t }}</el-tag>
          </div>
        </div>
        <div class="heroSide">
          <div class="sideRow">
            <span class="muted">ID</span>
            <span>{{ item.id }}</span>
          </div>
          <div class="sideRow">
            <span class="muted">Updated</span>
            <span>{{ item.updatedAt }}</span>
          </div>
        </div>
      </div>

      <el-row :gutter="12">
        <el-col :xs="24" :md="16">
          <el-card class="panel" shadow="never">
            <template #header>
              <div class="panelTitle">详情表单（示例）</div>
            </template>
            <el-form label-position="top" class="form">
              <el-form-item label="名称">
                <el-input v-model="form.name" size="large" />
              </el-form-item>
              <el-form-item label="摘要">
                <el-input v-model="form.summary" type="textarea" :rows="5" />
              </el-form-item>
              <div class="actions">
                <el-button @click="router.push('/examples')">返回列表</el-button>
                <el-button type="primary" @click="onSave">保存</el-button>
              </div>
            </el-form>
          </el-card>
        </el-col>

        <el-col :xs="24" :md="8">
          <el-card class="panel" shadow="never">
            <template #header>
              <div class="panelTitle">说明</div>
            </template>
            <div class="para">该页面用于演示：动态路由参数、空态处理、基础表单结构与统一提示。</div>
            <div class="para">你可以删除 entire examples 模块，并将路由替换为自己的业务路由。</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  margin-top: 12px;
}

.hero {
  border: 1px solid rgba(2, 6, 23, 0.08);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.78);
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.heroMain {
  min-width: 0;
}

.titleRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.title {
  font-size: 20px;
  font-weight: 900;
  min-width: 0;
}

.summary {
  margin-top: 8px;
  color: rgba(15, 23, 42, 0.68);
  font-size: 12px;
  line-height: 1.5;
}

.tags {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.heroSide {
  min-width: 240px;
  border-left: 1px solid rgba(2, 6, 23, 0.06);
  padding-left: 14px;
}

.sideRow {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 0;
  font-size: 12px;
}

.panel {
  border-radius: 18px;
  border: 1px solid rgba(2, 6, 23, 0.08);
  background: rgba(255, 255, 255, 0.75);
  margin-top: 12px;
}

.panelTitle {
  font-weight: 900;
}

.form {
  max-width: 760px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.para {
  font-size: 12px;
  color: rgba(15, 23, 42, 0.68);
  line-height: 1.6;
  margin-bottom: 10px;
}

.muted {
  color: rgba(15, 23, 42, 0.6);
}

@media (max-width: 920px) {
  .heroSide {
    border-left: none;
    padding-left: 0;
    min-width: 0;
  }
}
</style>
