# Otto's Personal Portfolio Website

## Overview
个人作品集网站，持续迭代，无固定范围。后续计划加入登录系统和留言功能。

## Tech Stack
React (JS) + Next.js (App Router) + Tailwind CSS v4 + MDX (gray-matter + next-mdx-remote) + npm

## Project Structure
```
app/
├── layout.jsx           # 根布局、字体加载、favicon 元信息
├── page.jsx             # 首页组装
├── globals.css          # 全局样式（大屏字号 clamp、漂浮文字动画）
├── blog/
│   ├── page.jsx         # 博客列表页（/blog）
│   └── [slug]/
│       └── page.jsx     # 博客详情页（/blog/xxx），MDX 渲染
└── components/
    ├── Navbar.jsx       # 固定顶部导航，滚动缩小，多语言走马灯
    ├── Footer.jsx       # 固定底部，版权 + SocialLinks
    ├── SocialLinks.jsx  # 社交图标（内联 SVG）+ 联系方式 Modal
    ├── HeroSection.jsx  # 首页第一屏：展示层 ↔ 正常层滚动过渡
    └── BlogSection.jsx  # 首页 Section2：博客入口 + Recent Posts
content/posts/           # MDX 文章源，每篇一个 .mdx 文件（含 frontmatter）
lib/posts.js             # 读取/解析文章：getAllPosts / getPostBySlug
public/                  # 图片素材
```

## Current State

### 已完成
- **Navbar**：固定顶部，火焰标题 + 走马灯欢迎词；下拉菜单含 Blog 链接跳 `/blog`
- **Footer + SocialLinks**：底部社交图标；联系方式 Modal 带 focus-in 淡入 + 快速淡出动画
- **HeroSection**：sticky 容器里"展示层（漂浮文字 + 大头像）" ↔ "正常层（自我介绍）"滚动过渡，桌面端用 ref + rAF 直接改 DOM 避免 React 重渲染；移动端禁用位移动画只做淡入淡出；头像 hover 彩蛋：放大 + 呼吸光晕 + 金色描边 + 渐变切换到 `blackav.jpg` 真人照
- **BlogSection**：首页 Section2 博客入口；左侧大号花体 `Enter`（Great Vibes，金色 + 呼吸光晕 hover）整块作为 `/blog` 链接；右侧上半诗意简介 + 下半 Recent Posts（取 `content/posts/` 最新 3 篇）；标题中英并列同尺寸（灰 / 金）；靠负 margin-top 消除 HeroSection 尾部空白
- **博客 MDX 管线**：`content/posts/*.mdx` 写作 → `lib/posts.js` 读取解析 frontmatter（slug/title/date/excerpt/tags）→ `/blog` 列表 + `/blog/[slug]` 详情；详情页用 `next-mdx-remote/rsc` 渲染，支持 `generateStaticParams` 静态生成和 `generateMetadata` 独立 SEO
- 大屏字号自适应（27寸不偏小）
- **Logo / 头像**：`neon_back.png`（透明底，favicon）/ `yellow.jpg`（Hero 头像，CSS `scale(1.7)` 放大居中）/ `blackav.jpg`（hover 切换的真人照）/ `neon.jpg` + `mult.jpg` 为素材源文件

### 待完成
- 首页其余 section（项目、技能、联系）
- 文章正文排版美化（考虑 `@tailwindcss/typography` 的 prose）
- 登录系统 + 文章留言 + 点赞功能（依赖数据库，后期统一接入；文章迁数据库时 frontmatter 字段直接映射为列）

## Commands
- `npm run dev` — 开发服务器 (localhost:3000)
- `npm run build` — 生产构建
- `npm run start` — 启动生产服务器

## 写新文章
1. 在 `content/posts/` 新建 `<slug>.mdx`
2. 顶部填 frontmatter：`slug` / `title` / `date` (YYYY-MM-DD) / `excerpt` / `tags`
3. 下面写 markdown 正文（可嵌 React 组件）
4. push 后自动出现在 `/blog` 和首页 Recent Posts

## Style Conventions
- 深色背景 + 金/黄色点缀，简洁现代
- 字体：Fredoka（品牌/标题）、Quicksand（英文正文）、Noto Sans SC（中文正文）、Great Vibes（花体/点缀，如 BlogSection 的 Enter）
- 图标源：iconbuddy.com streamline-ultimate（目前已全部内联）
- 域名：ottokeigo.com

## 关键踩坑
- `page.jsx` 外层容器用 `overflowX: "clip"` 而非 `overflow-x-hidden`，否则破坏 HeroSection 的 sticky 定位
- 层级规划：Navbar `z-50`、Modal `z-100`、HeroSection `z-10/20`、BlogSection `z-8`、Footer `z-40`；新增 fixed/sticky 元素务必显式设 z-index