export type ExampleItem = {
  id: string
  name: string
  summary: string
  status: 'draft' | 'active' | 'archived'
  tags: string[]
  updatedAt: string
}

export const exampleItems: ExampleItem[] = [
  {
    id: 'alpha',
    name: 'Alpha Item',
    summary: '用于演示列表筛选、详情页路由与基础信息展示。',
    status: 'active',
    tags: ['Demo', 'List'],
    updatedAt: '2026-03-01',
  },
  {
    id: 'beta',
    name: 'Beta Item',
    summary: '用于演示表单提交与状态变化（示例数据）。',
    status: 'draft',
    tags: ['Demo', 'Form'],
    updatedAt: '2026-02-18',
  },
  {
    id: 'gamma',
    name: 'Gamma Item',
    summary: '用于演示空态、错误态与权限拦截的组合使用。',
    status: 'archived',
    tags: ['Demo', 'Auth'],
    updatedAt: '2026-01-11',
  },
]

export function getExampleItemById(id: string): ExampleItem | undefined {
  return exampleItems.find((x) => x.id === id)
}
