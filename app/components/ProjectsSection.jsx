"use client"

import { useState } from "react"
import Image from "next/image"
import { projects } from "../../lib/projects"
import ResumeLink from "./ResumeLink"

/* 类型标签药丸：web 暖金 / ai 紫 / game 冷蓝 */
const TYPE_STYLES = {
  web: { color: "rgba(255, 210, 0, 0.8)", border: "1px solid rgba(255, 215, 0, 0.25)" },
  ai: { color: "rgba(200, 180, 255, 0.85)", border: "1px solid rgba(170, 140, 255, 0.3)" },
  game: { color: "rgba(180, 200, 255, 0.8)", border: "1px solid rgba(150, 180, 255, 0.25)" },
}

function TypePill({ type }) {
  return (
    <span
      className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
      style={TYPE_STYLES[type] || TYPE_STYLES.web}
    >
      {type}
    </span>
  )
}

export default function ProjectsSection() {
  /* 当前悬停/聚焦的项目索引，驱动右侧预览切换 */
  const [active, setActive] = useState(0)
  const activeProject = projects[active]
  const activeHost = new URL(activeProject.url).hostname

  return (
    <section
      id="projects"
      className="px-8 md:px-16 lg:px-24 py-12 md:py-20 relative z-8 scroll-mt-24"
      style={{ fontFamily: "var(--font-quicksand)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* 标题区：中英并列，同尺寸不同色 */}
        <div className="flex flex-row items-baseline gap-3 md:gap-5 flex-wrap">
          <h2
            className="text-2xl md:text-4xl font-semibold text-gray-300 leading-none"
            style={{ fontFamily: "var(--font-noto-sc)", letterSpacing: "0.05em" }}
          >
            项目
          </h2>
          <p
            className="text-2xl md:text-4xl font-bold tracking-wide leading-none"
            style={{ fontFamily: "var(--font-fredoka)", color: "rgba(255, 210, 0, 0.82)" }}
          >
            Projects
          </p>
        </div>

        {/* 标题下分隔线 */}
        <div
          className="h-px w-full mt-5 mb-8 md:mt-6 md:mb-12"
          style={{
            background:
              "linear-gradient(to right, rgba(255,215,0,0.2), rgba(255,255,255,0.05), transparent)",
          }}
        />

        {/* 桌面端：左 35% 编号列表 · 竖分隔线 · 右 65% 预览框 */}
        <div className="hidden md:flex gap-8 lg:gap-12 items-stretch">

          {/* 左：编号列表 */}
          <div className="md:w-[35%] flex flex-col justify-center">
            {projects.map((p, i) => (
              <a
                key={p.no}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group block py-4"
                style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="text-sm tabular-nums transition-colors"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: active === i ? "rgba(255,210,0,0.9)" : "rgba(120,120,120,0.9)",
                    }}
                  >
                    {p.no}
                  </span>
                  <span
                    className="flex-1 text-lg md:text-xl font-semibold transition-colors"
                    style={{ color: active === i ? "rgba(255,210,0,0.9)" : "#d1d5db" }}
                  >
                    {p.title}
                  </span>
                  <TypePill type={p.type} />
                </div>

                {/* hover 当前行：底部淡入 meta（技术栈 + 访问） */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: active === i ? "5rem" : "0", opacity: active === i ? 1 : 0 }}
                >
                  <div
                    className="pt-2 pl-9 text-xs text-gray-500"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    {p.tech.join(" · ")}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* 竖向分隔线 */}
          <div className="w-px self-stretch" style={{ background: "rgba(255,255,255,0.07)" }} />

          {/* 右：预览框 */}
          <div className="md:w-[65%] flex flex-col justify-center">
            <div
              className="relative rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* 浏览器顶栏：三个点 + 地址（随活跃项目变化） */}
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,95,86,0.7)" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(255,189,46,0.7)" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "rgba(39,201,63,0.7)" }} />
                <span
                  className="ml-3 text-xs text-gray-500 truncate"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {activeHost}
                </span>
              </div>

              {/* 截图：全部叠放，按活跃索引交叉淡入 */}
              <div className="relative w-full" style={{ aspectRatio: "2392 / 1400" }}>
                {projects.map((p, i) => (
                  <Image
                    key={p.no}
                    src={p.thumb}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-cover transition-opacity duration-[350ms]"
                    style={{ opacity: active === i ? 1 : 0 }}
                  />
                ))}
              </div>
            </div>

            {/* 框下：技术栈芯片 + 访问入口 */}
            <div className="flex items-center justify-between gap-3 mt-4">
              <div className="flex flex-wrap gap-2">
                {activeProject.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md text-gray-400"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      fontFamily: "var(--font-jetbrains)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold whitespace-nowrap transition-colors hover:text-yellow-300"
                style={{ color: "rgba(255,210,0,0.9)" }}
              >
                访问 →
              </a>
            </div>
          </div>
        </div>

        {/* 移动端：砍掉预览与 hover，列表改自带缩略图的堆叠卡 */}
        <div className="md:hidden flex flex-col gap-4">
          {projects.map((p) => (
            <a
              key={p.no}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 items-center rounded-xl overflow-hidden p-3"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="relative w-28 flex-shrink-0 rounded-lg overflow-hidden"
                style={{ aspectRatio: "2392 / 1400" }}
              >
                <Image src={p.thumb} alt={p.title} fill sizes="112px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs text-gray-600"
                    style={{ fontFamily: "var(--font-jetbrains)" }}
                  >
                    {p.no}
                  </span>
                  <span className="text-base font-semibold text-gray-200 truncate">{p.title}</span>
                </div>
                <TypePill type={p.type} />
                <span
                  className="text-xs text-gray-500"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {p.tech.join(" · ")}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* 底部：查看完整简历 CTA */}
        <div className="mt-10 md:mt-14 flex justify-center">
          <ResumeLink />
        </div>

      </div>
    </section>
  )
}
