---
name: new-section
description: 在首页新增一个 section（如项目/技能/联系），按本项目的暗金设计语言、字体、分层与装配约定搭好骨架并接入 page.jsx。当用户说"加一个首页 section / 新做项目（技能/联系）板块 / new section"时触发。
---

# 新增首页 Section

帮 Otto 在首页加一个新板块。先问清这一节是**讲什么**（项目 / 技能 / 联系 / 其他）和大致内容，再按下面的约定产出，**不要发明新风格**——目标是和 HeroSection / BlogSection 浑然一体，避免"AI 味"。

## 产出步骤
1. 在 `app/components/` 新建 `<Name>Section.jsx`（如 `ProjectsSection.jsx`）。
2. 在 `app/page.jsx` 里 import 并放到合适位置（Hero → Blog → 新 section → Footer 顺序，替换掉占位的 `Section 3/4` 那段）。
3. 如果要让 Navbar 下拉能跳到它：给 `<section>` 加 `id`（如 `id="projects"`）+ `scroll-mt-24`，并把 Navbar 对应项改成 `scrollIntoView` 平滑滚动（参考 Blog 那项的写法）。

## 结构骨架（照抄这个外壳）
```jsx
<section
  id="..."                       // 需要锚点导航时才加
  className="px-8 md:px-16 lg:px-24 py-12 md:py-20 relative z-8 scroll-mt-24"
  style={{ fontFamily: "var(--font-quicksand)" }}
>
  <div className="max-w-6xl mx-auto">
    {/* 标题区：中英并列，同尺寸不同色 */}
    <div className="mb-6 md:mb-10 flex flex-row items-baseline gap-3 md:gap-5 flex-wrap">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-300 leading-none"
          style={{ fontFamily: "var(--font-noto-sc)", letterSpacing: "0.05em" }}>
        中文标题
      </h2>
      <p className="text-2xl md:text-4xl font-bold tracking-wide leading-none"
         style={{ fontFamily: "var(--font-fredoka)", color: "rgba(255, 210, 0, 0.82)" }}>
        English
      </p>
    </div>
    {/* 主体内容 */}
  </div>
</section>
```

## 设计 token（统一用这些值，别另起一套）
- 背景：页面已是暗金渐变，section 自身一般透明，不另铺底色。
- 金色点缀：`rgba(255, 210, 0, 0.82)`（标题/强调），更淡处可降透明度。
- 细分隔线：竖 `rgba(255, 255, 255, 0.07)`；横向带金可用
  `linear-gradient(to right, rgba(255,215,0,0.2), rgba(255,255,255,0.05), transparent)`。
- 正文灰阶递进：`text-gray-300 / 400 / 500 / 600`（越次要越暗）。
- 容器留白：`px-8 md:px-16 lg:px-24`，内层 `max-w-6xl mx-auto`。

## 字体（CSS 变量，按用途选）
- `--font-fredoka`：品牌 / 英文标题
- `--font-quicksand`：英文正文（section 默认 fontFamily）
- `--font-noto-sc`：中文正文 / 中文标题
- `--font-great-vibes`：花体点缀（如 BlogSection 的 Enter）
- `--font-jetbrains`：等宽 / 代码感 / dev 味文案

## 响应式
- 桌面横排移动竖排：`flex flex-col md:flex-row`，对齐 `items-center md:items-stretch`。
- 移动端避免大位移动画，优先淡入淡出（参考 HeroSection 移动端分支）。

## 关键约束（务必遵守）
- **z-index 分层**：Navbar `z-50`、Modal `z-100`、Hero `z-10/20`、Blog `z-8`、Footer `z-40`。新 section 普通内容给 `z-8` 左右即可；任何新增 fixed/sticky 元素**必须显式设 z-index**。
- 不要在 `page.jsx` 外层动 `overflowX: "clip"`（改成 `overflow-x-hidden` 会破坏 Hero 的 sticky）。
- 消除与上一节的空白可用负 margin（参考 BlogSection 的 `mt-[-16vh] md:mt-[-20vh]`），按需微调。
- 需要平滑滚动的交互，复用现有写法：`document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })`。

## 注释风格
中文、简洁；同类的多块合并成一行注释；一次把整个文件改完再交给用户看，别零碎多轮。
