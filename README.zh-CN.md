# React Function App 模板

一个全栈应用模板，前端使用现代 React + Vite 构建，并集成无服务器 API 函数。

> [English](./README.md) | 简体中文

## 特性

- **React 18** - 最新 React，支持 Hooks 和函数组件
- **Vite** - 极速开发体验，即时热更新
- **TypeScript** - 前端完整的类型安全
- **Serverless Functions** - 在 `/api` 目录中编写 API 路由，使用 Web Standard API
- **全栈 Todo 应用** - 前后端联通的完整 CRUD 示例

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发

```bash
# 启动开发服务器 http://localhost:3000
npm run dev
```

### 构建

```bash
# 构建生产版本
npm run build
```

## 项目结构

```
react-function/
├── api/                    # 无服务器 API 函数
│   ├── hello.js           # GET/POST /api/hello - 健康检查
│   ├── todos.js           # CRUD /api/todos - Todo 管理
│   └── users/
│       └── [id].js        # GET/PUT/DELETE /api/users/:id - 动态路由
├── public/                 # 静态资源
│   └── vite.svg
├── src/                    # React 前端源码
│   ├── App.tsx            # 主应用组件（Todo UI）
│   ├── App.css            # 应用样式
│   ├── main.tsx           # 入口文件
│   ├── index.css          # 全局样式
│   └── vite-env.d.ts      # Vite 类型声明
├── index.html              # HTML 入口
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 部署

```bash
iga pages build
iga pages deploy
```
