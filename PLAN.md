# 开发计划 / Plan

## Section3 · 项目展示（悬停索引）

> 设计已定稿，待下个对话写代码。沿用全站暗金设计语言、字体、分层与装配约定。

### 布局骨架
```
<section id="projects">   z-8 · scroll-mt-24 · 承接 BlogSection 后正常流
  标题区   项目 / Projects        中英并列，灰 + 金（同 BlogSection 写法）
  ──── 分隔线 ────
  主体  flex：左 35% 编号列表 · 竖分隔线 · 右 65% 预览框
  底部  查看完整简历 →            复用已有简历入口
```

### 左侧：编号列表
- 4 行，每行：`01` 编号（JetBrains mono，灰，hover 变金）+ 项目名 + 右侧 `Web`/`Game` 标签药丸
- 行间细分隔线 `rgba(255,255,255,0.06)`
- 整行作为链接，点击跳实站 / itch（`target="_blank"`）
- hover 当前行：项目名变金、编号提亮、底部淡入一行 meta（技术栈 + 「访问 →」）

### 右侧：预览框（一个框讲完所有事）
- 圆角框，边框 `rgba(255,255,255,0.08)`，比例 16:10
- 默认显示第 1 个项目截图；hover 某行 → 截图交叉淡入切换（opacity ~350ms）
- 当前活跃项目给金色呼吸光晕（复用头像彩蛋 glow）
- 框内分区：截图 +（下方）技术栈芯片 + 「访问 →」
- Web 项目可加极简浏览器顶栏（三个点）做容器感；游戏项目换标签即可

### 移动端（复用 BlogSection 降级思路）
- 砍掉右侧预览框和 hover
- 列表改成每项自带小缩略图的堆叠卡，点击跳转
- 只保留淡入、不做位移

### 数据
抽 `lib/projects.js` 导出数组，字段：
```
{ no, title, type: "web" | "game", tech: [], thumb, url }
```
- 4 条：Oiko · Murex / Health Quiz Funnel / 2D Game / 3D Game
- 简历单独做底部 CTA

| 项目 | url | 占位图 |
|---|---|---|
| Oiko · Murex | oiko-murex.vercel.app | `public/projects/oiko.svg` |
| Health Quiz Funnel | health-quiz-funnel.vercel.app | `public/projects/health-quiz.svg` |
| 2D Game | ottoma.itch.io/finalproject | `public/projects/game-2d.svg` |
| 3D Game | ottoma.itch.io/451-final-project | `public/projects/game-3d.svg` |

### 图片素材
- 现为暗金占位 SVG（1200×750，16:10），已就位
- 换真图：统一裁 16:10，建议导出 `.png`，丢进 `public/projects/` 覆盖
- `thumb` 字段单独存，换图只改扩展名
- 渲染：占位 SVG 阶段先用 `<img>`；换 PNG 后切 `next/image` 优化（用 SVG 走 next/image 需开 `dangerouslyAllowSVG`）
- 游戏后续可把静态图换成自录静音循环 GIF

### 决策记录（避免反复）
- ❌ 实时 iframe 预览：游戏嵌不进、Vercel 站可能被 CSP 挡、多框拖垮首页、移动端废
- ❌ URL 截图服务自动抓：游戏只会抓到 itch 落地页、裁剪不可控、有延迟/费用
- ✅ 自备静态截图：可截游戏真实玩法、Web 挑最佳一屏、零依赖零成本
- ✅ 技术栈收进右预览框，不另开浮动卡（避免双框抢戏）
