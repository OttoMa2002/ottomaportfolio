# Otto's Personal Portfolio Website

## Overview
个人作品集网站，持续迭代，无固定范围。后续计划加入登录系统和留言功能。
开发分支：`normal_dev` → PR 合并到 `main`。

## Tech Stack
React (JS) + Next.js (App Router) + Tailwind CSS v4 + npm

## Project Structure
```
app/
├── layout.jsx           # 根布局，字体加载（Fredoka / Quicksand / Noto Sans SC）
├── page.jsx             # 首页，组装各 section 组件
├── globals.css          # 全局样式（含大屏字体缩放 clamp）
└── components/
    ├── Navbar.jsx       # 固定顶部导航，滚动时自动缩小
    ├── Footer.jsx       # 固定底部，版权 + SocialLinks
    ├── SocialLinks.jsx  # 社交图标：链接类直接跳转，联系方式类弹 Modal
    └── HeroSection.jsx  # 首页第一块主体内容（见下方说明）
public/                  # favicon、SVG 图标、avatar.jpg
```

## Current State

### 已完成
- **Navbar**：固定顶部，滚动缩小/还原，含走马灯多语言欢迎词、火焰文字效果、流动光圈背景
- **Footer + SocialLinks**：固定底部，Instagram/Bilibili/GitHub 跳外链，Email/WeChat/Phone 弹 Modal
- **HeroSection**（首页第一块）：
  - 左侧：头像（圆形，`/public/avatar.jpg`）+ 斜体引言
  - 右侧：中文名 + 英文名、专业方向（中英双语）、学历（硕士/本科，中英双语）
- 大屏适配：`html { font-size: clamp(16px, 1.1vw, 20px) }` 保证 27寸等大屏不偏小

### 待完成
- 首页其余 section（项目展示、技能、联系等）
- 登录系统
- 留言功能

## Commands
- `npm run dev` — 开发服务器 (localhost:3000)
- `npm run build` — 生产构建
- `npm run start` — 启动生产服务器

## Style Conventions
- 深色背景 + 金色/黄色点缀，整体风格简洁现代
- 字体：Fredoka（中文品牌字/标题）、Quicksand（英文正文）、Noto Sans SC（中文正文）
- 图标来源：iconbuddy.com streamline-ultimate