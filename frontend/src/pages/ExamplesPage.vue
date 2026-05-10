<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { exampleItems, type ExampleItem } from '../data/examples'

const router = useRouter()
const keyword = ref('')
const status = ref<'all' | ExampleItem['status']>('all')
const tag = ref<string>('all')
const sortField = ref<'default' | 'updatedAt' | 'name'>('default')
const sortOrder = ref<'asc' | 'desc'>('asc')

const allTags = computed(() => {
  const set = new Set<string>()
  for (const x of exampleItems) for (const t of x.tags) set.add(t)
  return ['all', ...Array.from(set)]
})

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  const result = exampleItems.filter((x) => {
    const matchesKeyword = !kw || `${x.name} ${x.summary} ${x.tags.join(' ')}`.toLowerCase().includes(kw)
    const matchesStatus = status.value === 'all' || x.status === status.value
    const matchesTag = tag.value === 'all' || x.tags.includes(tag.value)
    return matchesKeyword && matchesStatus && matchesTag
  })
  if (sortField.value === 'default') {
    return result
  }
  const sorted = [...result].sort((a, b) => {
    let compareResult = 0
    if (sortField.value === 'updatedAt') {
      compareResult = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    } else if (sortField.value === 'name') {
      compareResult = a.name.localeCompare(b.name)
    }
    return sortOrder.value === 'asc' ? compareResult : -compareResult
  })
  return sorted
})

function statusLabel(s: ExampleItem['status']) {
  if (s === 'active') return 'Active'
  if (s === 'draft') return 'Draft'
  return 'Archived'
}
</script>

<template>
  <div class="page">
    <div class="head">
      <div>
        <div class="title">示例模块</div>
        <div class="sub">可删除的示例列表页：筛选、空态与详情跳转。</div>
      </div>
      <div class="tools">
        <el-input v-model="keyword" size="large" placeholder="搜索名称 / 标签" clearable class="toolInput" />
        <el-select v-model="status" size="large" class="toolSelect" placeholder="状态">
          <el-option label="All" value="all" />
          <el-option label="Active" value="active" />
          <el-option label="Draft" value="draft" />
          <el-option label="Archived" value="archived" />
        </el-select>
        <el-select v-model="tag" size="large" class="toolSelect" placeholder="标签">
          <el-option v-for="t in allTags" :key="t" :label="t" :value="t" />
        </el-select>
        <el-select v-model="sortField" size="large" class="toolSelect" placeholder="排序">
          <el-option label="默认顺序" value="default" />
          <el-option label="更新时间" value="updatedAt" />
          <el-option label="名称" value="name" />
        </el-select>
        <el-select v-model="sortOrder" size="large" class="toolSelect" placeholder="顺序" :disabled="sortField === 'default'">
          <el-option label="升序" value="asc" />
          <el-option label="降序" value="desc" />
        </el-select>
      </div>
    </div>

    <div class="grid">
      <el-card v-for="x in filtered" :key="x.id" shadow="hover" class="card" @click="router.push(`/examples/${x.id}`)">
        <div class="body">
          <div class="nameRow">
            <div class="name">{{ x.name }}</div>
            <el-tag effect="light" round size="small">{{ statusLabel(x.status) }}</el-tag>
          </div>
          <div class="summary">{{ x.summary }}</div>
          <div class="meta">
            <span class="muted">Updated {{ x.updatedAt }}</span>
            <span class="spacer" />
            <el-tag v-for="t in x.tags" :key="t" size="small" effect="plain" round>{{ t }}</el-tag>
          </div>
        </div>
      </el-card>
    </div>

    <el-empty v-if="filtered.length === 0" description="没有匹配的数据" />
  </div>
</template>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 12px;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 10px;
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

.tools {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
}

.toolInput {
  width: min(360px, 60vw);
}

.toolSelect {
  width: 140px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.card {
  border-radius: 18px;
  cursor: pointer;
  border: 1px solid rgba(2, 6, 23, 0.08);
  background: rgba(255, 255, 255, 0.78);
}

.body {
  padding: 4px 2px;
}

.nameRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.name {
  font-weight: 900;
  line-height: 1.2;
}

.summary {
  margin-top: 8px;
  font-size: 12px;
  color: rgba(15, 23, 42, 0.62);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.spacer {
  flex: 1;
}

.muted {
  color: rgba(15, 23, 42, 0.6);
  font-size: 12px;
}

@media (max-width: 1080px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .toolSelect {
    width: 160px;
  }
}
</style>
