# Otto's Personal Portfolio Website

## Overview
个人网站/作品集，持续迭代中，无固定范围。

## Tech Stack
React (JS) + Vite + Tailwind CSS v4 + npm

## Project Structure
```
src/
├── main.jsx        # React 入口
├── App.jsx         # 根组件（导航栏、页面内容、页脚）
├── App.css         # 组件样式
├── index.css       # Tailwind 入口 + 全局样式
└── assets/         # 静态资源
public/             # favicon、SVG 图标等
index.html          # HTML 入口（Google Fonts、favicon）
vite.config.js      # Vite 配置（React + Tailwind 插件）
```

## Current State
- 固定导航栏（含多语言"欢迎"无限滚动横幅）+ 固定页脚已完成
- 深色主题 + 金色点缀的整体风格已确定
- 页面主体为占位内容，待替换
- 尚未安装路由（react-router-dom）

## Commands
- `npm run dev` — 开发服务器 (localhost:5173)
- `npm run build` — 生产构建
- `npm run preview` — 预览生产构建

## Style Conventions
- 字体：Fredoka（品牌）、Quicksand（正文）— Google Fonts
- 配色：深色背景 + 金色/黄色点缀
- 图标来源：iconbuddy.com streamline-ultimate