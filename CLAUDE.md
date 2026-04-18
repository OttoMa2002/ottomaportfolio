# Otto's Personal Portfolio Website

## Overview
个人作品集网站，持续迭代，无固定范围。后续计划加入登录系统和留言功能。
在 `main` 分支开发。

## Tech Stack
React (JS) + Next.js (App Router) + Tailwind CSS v4 + npm

## Project Structure
```
app/
├── layout.jsx           # 根布局、字体加载、favicon 元信息
├── page.jsx             # 首页组装
├── globals.css          # 全局样式（大屏字号 clamp、漂浮文字动画）
├── blog/
│   └── page.jsx         # 博客页面（/blog），当前为骨架
└── components/
    ├── Navbar.jsx       # 固定顶部导航，滚动缩小，多语言走马灯
    ├── Footer.jsx       # 固定底部，版权 + SocialLinks
    ├── SocialLinks.jsx  # 社交图标（内联 SVG）+ 联系方式 Modal
    ├── HeroSection.jsx  # 首页第一屏：展示层 ↔ 正常层滚动过渡
    └── BlogSection.jsx  # 首页 Section2：博客入口（花体 Enter + 简介 + 最新文章预览位）
public/                  # 图片素材（见下）
```

## Current State

### 已完成
- **Navbar**：固定顶部，火焰标题 + 走马灯欢迎词；下拉菜单含 Blog 链接跳 `/blog`
- **Footer + SocialLinks**：底部社交图标；联系方式 Modal 带 focus-in 淡入 + 快速淡出动画
- **HeroSection**：sticky 容器里"展示层（漂浮文字 + 大头像）" ↔ "正常层（自我介绍）"滚动过渡，桌面端用 ref + rAF 直接改 DOM 避免 React 重渲染；移动端禁用位移动画只做淡入淡出；头像 hover 彩蛋：放大 + 呼吸光晕 + 金色描边 + 渐变切换到 `blackav.jpg` 真人照
- **BlogSection**：首页 Section2 博客入口；左侧大号花体 `Enter`（Great Vibes，金色 + 呼吸光晕 hover）整块作为 `/blog` 链接；右侧上半诗意简介 + 下半 Recent Posts 预留位（2:3 比例，w-fit mx-auto 居中）；标题中英并列同尺寸（灰 / 金）；靠负 margin-top 消除 HeroSection 尾部空白
- **`/blog` 页面**：骨架已建（[app/blog/page.jsx](app/blog/page.jsx)），等文章内容 + MDX/数据库方案
- 大屏字号自适应（27寸不偏小）
- **Logo / 头像**：`neon_back.png`（透明底，favicon）/ `yellow.jpg`（Hero 头像，CSS `scale(1.7)` 放大居中）/ `blackav.jpg`（hover 切换的真人照）/ `neon.jpg` + `mult.jpg` 为素材源文件

### 待完成
- 首页其余 section（项目、技能、联系）
- 博客正文：MDX/Markdown 文章落地，`/blog/[slug]` 详情路由，文章预留 `id/slug` 字段方便后续关联数据库
- 登录系统 + 文章留言 + 点赞功能（依赖数据库，后期统一接入）

## Commands
- `npm run dev` — 开发服务器 (localhost:3000)
- `npm run build` — 生产构建
- `npm run start` — 启动生产服务器

## Style Conventions
- 深色背景 + 金/黄色点缀，简洁现代
- 字体：Fredoka（品牌/标题）、Quicksand（英文正文）、Noto Sans SC（中文正文）、Great Vibes（花体/点缀，如 BlogSection 的 Enter）
- 图标源：iconbuddy.com streamline-ultimate（目前已全部内联）
- 域名：ottokeigo.com

## 关键踩坑
- `page.jsx` 外层容器用 `overflowX: "clip"` 而非 `overflow-x-hidden`，否则破坏 HeroSection 的 sticky 定位