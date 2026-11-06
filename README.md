# React Function App Template

A full-stack application template featuring a modern React frontend powered by Vite, integrated with serverless API functions.

> English | [简体中文](./README.zh-CN.md)

## Features

- **React 18** - Latest React with hooks and functional components
- **Vite** - Lightning fast development with instant HMR
- **TypeScript** - Full type safety for the frontend
- **Serverless Functions** - API routes in the `/api` directory using Web Standard APIs
- **Full-Stack Todo App** - Complete CRUD example connecting frontend to backend

## Quick Start

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server at http://localhost:3000
npm run dev
```

### Build

```bash
# Build for production
npm run build
```

## Project Structure

```
react-function/
├── api/                    # Serverless API functions
│   ├── hello.js           # GET/POST /api/hello - Health check
│   ├── todos.js           # CRUD /api/todos - Todo management
│   └── users/
│       └── [id].js        # GET/PUT/DELETE /api/users/:id - Dynamic route
├── public/                 # Static assets
│   └── vite.svg
├── src/                    # React frontend source
│   ├── App.tsx            # Main app component (Todo UI)
│   ├── App.css            # App styles
│   ├── main.tsx           # Entry point
│   ├── index.css          # Global styles
│   └── vite-env.d.ts      # Vite type declarations
├── index.html              # HTML entry
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
