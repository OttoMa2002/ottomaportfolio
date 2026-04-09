# Otto's Personal Portfolio Website

## Overview
个人作品集网站，持续迭代，无固定范围。后续计划加入登录系统和留言功能。
直接在 `main` 分支开发（`normal_dev` 已删除）。

## Tech Stack
React (JS) + Next.js (App Router) + Tailwind CSS v4 + npm

## Project Structure
```
app/
├── layout.jsx           # 根布局，字体加载（Fredoka / Quicksand / Noto Sans SC）
├── page.jsx             # 首页，组装各 section 组件
├── globals.css          # 全局样式（含大屏字体缩放 clamp、漂浮文字动画）
└── components/
    ├── Navbar.jsx       # 固定顶部导航，滚动时自动缩小
    ├── Footer.jsx       # 固定底部，版权 + SocialLinks
    ├── SocialLinks.jsx  # 社交图标：链接类直接跳转，联系方式类弹 Modal
    └── HeroSection.jsx  # 首页第一块：展示态 + 滚动过渡 + 正常信息布局
public/                  # favicon、SVG 图标、logo（三版配色）
```

## Current State

### 已完成
- **Navbar**：固定顶部，滚动缩小/还原，含走马灯多语言欢迎词、火焰文字效果、流动光圈背景
- **Footer + SocialLinks**：固定底部，Instagram/Bilibili/GitHub 跳外链，Email/WeChat/Phone 弹 Modal
- **HeroSection 展示态**（滚动触发视觉过渡）：
  - 单 section 内 sticky 容器，CSS Grid 布局（`grid-template: 1fr / 1fr`），两层同 cell 叠加
  - 正常层：grid child，由 `align-items: center` 居中，`paddingTop: 5rem` 预留 navbar 空间，淡入时同步 `translateY` 上滑（NORMAL_SLIDE_UP = 200px）
  - 展示层：`position: absolute` + `inset: 0` 覆盖在上，仅含漂浮文字（hover 放大高亮）
  - **浮动头像（logo）**：独立于两层，`position: absolute` 在 sticky 容器内，通过 ref 测量起点（sticky 中心）和终点（正常层占位位置）进行 lerp 插值，实现从展示层大头像（桌面 380px / 移动 300px）丝滑移动+缩放到正常层小位置。两层各自的头像设为 `visibility: hidden` 仅用于占位和测量
  - **性能优化**：动画不通过 React state 驱动，改用 ref + requestAnimationFrame + 直接 DOM style 操作，避免滚动时触发 React 重渲染，移动端流畅度大幅提升
  - 测量时临时重置 normalLayer transform 以获取自然位置，测完恢复
  - 滚动进度线性映射（无 easeOut），展示层 0→50% 淡出，正常层 40%→100% 淡入
  - 动画参数集中在文件顶部（FLOATING_TEXTS、SCROLL_DISTANCE、FADE_OUT_END、FADE_IN_START、NORMAL_SLIDE_UP）
  - 漂浮文字样式在 globals.css `.hero-floating-text`
  - **移动端适配**：禁用浮动头像位移动画（性能考虑），展示层显示静态居中 logo，正常层头像直接可见，滚动仅做淡入淡出；桌面端保留完整 lerp 位移动画
  - ⚠️ **关键注意**：page.jsx 外层容器必须用 `overflowX: "clip"` 而非 `overflow-x-hidden`，否则会破坏 sticky 定位
- 大屏适配：`html { font-size: clamp(16px, 1.1vw, 20px) }` 保证 27寸等大屏不偏小
- **Logo**：OT 字母组合 logo，三版配色（blackyellow / yellowblack / neon），已裁为正方形。blackyellow 用作 favicon 和 HeroSection 头像
- **README** 已更新：双语项目介绍 + 技术栈 + 作者信息

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
- 域名：ottokeigo.com
