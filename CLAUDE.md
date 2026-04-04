# Otto's Personal Portfolio Website

## Overview
个人网站/作品集，持续迭代中，无固定范围。计划加入登录系统和留言功能。

## Tech Stack
React (JS) + Next.js (App Router) + Tailwind CSS v4 + npm

## Project Structure
```
app/
├── layout.jsx           # 根布局（next/font、metadata）
├── page.jsx             # 首页（服务端组件）
├── globals.css          # Tailwind 入口 + 全局样式
└── components/
    ├── Navbar.jsx       # 导航栏（客户端组件，含多语言横幅）
    └── Footer.jsx       # 页脚（社交图标）
public/                  # favicon、SVG 图标等
next.config.mjs          # Next.js 配置
postcss.config.mjs       # PostCSS 配置（Tailwind）
```

## Current State
- 导航栏：滚动时自动缩小（隐藏走马灯，缩小字体），回到顶部时恢复大版本
- 导航栏含 SVG 滤镜驱动的文字烟雾/火焰效果（仅大版本）、背景流动光圈
- 点击 OTTO'S 平滑滚回页面顶部；下拉菜单鼠标移出自动关闭
- 深色主题 + 金色点缀的整体风格已确定
- 页面主体为占位内容，待替换
- 已从 Vite 迁移至 Next.js（App Router），为后续登录/留言功能做准备
- 字体通过 next/font 加载（CSS 变量：--font-fredoka, --font-quicksand）

## Commands
- `npm run dev` — 开发服务器 (localhost:3000)
- `npm run build` — 生产构建
- `npm run start` — 启动生产服务器

## Style Conventions
- 字体：Fredoka（品牌）、Quicksand（正文）— via next/font/google
- 配色：深色背景 + 金色/黄色点缀
- 图标来源：iconbuddy.com streamline-ultimate
