# Vue 3 + TypeScript + Vite 基础框架（通用脚手架）

这是一个基于现代前端技术栈构建的前端基础框架，目标是提供可复用的项目骨架：布局、路由、鉴权、请求封装、状态管理与工程化配置。仓库内自带的示例页面与示例数据用于演示工程结构，可随时删除或替换为你的业务模块。

## 🛠 技术栈

- **核心框架**: [Vue 3](https://vuejs.org/) (Composition API + Script Setup)
- **构建工具**: [Vite](https://vitejs.dev/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **UI 组件库**: [Element Plus](https://element-plus.org/)
- **路由管理**: [Vue Router 4](https://router.vuejs.org/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **HTTP 客户端**: [Axios](https://axios-http.com/) (已封装拦截器)
- **工程化**: 自动导入与组件按需加载（见 `vite.config.ts`）

## ✨ 核心特性

1.  **完善的 TypeScript 支持**:
    - 配置了 `env.d.ts`，支持 Vue 组件类型推断和环境变量智能提示。
    - 严格的类型检查配置。

2.  **自动化按需引入**:
    - 集成 `unplugin-auto-import` 和 `unplugin-vue-components`。
    - 无需手动 import Element Plus 组件和 Vue API (如 `ref`, `computed`)，提升开发效率并优化包体积。

3.  **健壮的网络层**:
    - 二次封装 Axios (`src/services/http.ts`)。
    - 统一的请求/响应拦截。
    - 自动携带 Token，统一处理 HTTP 错误。

4.  **路由权限控制**:
    - 全局路由守卫 (`src/router/index.ts`)。
    - 支持公开路由（`meta.public`）与登录拦截重定向机制。

5.  **响应式布局**:
    - 基于 Flex 和 Grid 的现代化布局。
    - 适配不同屏幕尺寸（桌面侧边栏 + 移动端抽屉）。

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
# 或者
yarn install
# 或者
pnpm install
```

### 2. 启动开发服务器

```bash
npm run dev
```
访问 http://localhost:5173 即可预览。

### 3. 构建生产版本

```bash
npm run build
```

## � 环境变量

复制 `.env.example` 为 `.env` 并按需修改：

- `VITE_APP_TITLE`：应用标题
- `VITE_API_BASE_URL`：后端 API 地址（可为空字符串）

## �📂 目录结构

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── layouts/         # 页面布局组件 (DefaultLayout)
├── pages/           # 示例页面 (Dashboard, Examples, Account, Login)
├── router/          # 路由配置
├── services/        # API 服务与 Axios 封装
├── stores/          # Pinia 状态管理 (AuthStore)
├── utils/           # 通用工具（如 token 存取）
├── styles/          # 全局样式
├── App.vue          # 根组件
├── main.ts          # 入口文件
└── style.css        # 全局样式重置
```

## 📝 常见操作指南

- **新增页面**: 在 `src/pages` 下创建 `.vue` 文件，并在 `src/router/index.ts` 注册路由与 `meta.title`。
- **新增模块**: 参考 `Examples` 示例页的模式新增列表/详情页，或直接删除示例模块并替换为业务模块。
- **网络请求**: 使用 `src/services/http.ts` 的 `http` 发起请求，默认携带 Token 并统一处理错误。
- **鉴权与用户态**: 使用 `src/stores/auth.ts` 管理 token 与用户信息；将 demo 登录替换为真实接口即可。

## ⚠️ 注意事项

- **登录演示**: 默认提供 demo 登录（任意非空账号密码即可登录），Token 存储在 localStorage。
- **可删除样例**: `Examples`/示例数据仅用于演示脚手架结构，可直接删除相关页面、数据与路由。
