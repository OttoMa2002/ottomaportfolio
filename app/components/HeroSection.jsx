"use client"

import { useEffect, useRef, useCallback } from "react"

/* 展示层漂浮英文：位置 / 字号 / 旋转角度 */
const FLOATING_TEXTS = [
  { text: "Creative Developer",  x: "8%",  y: "22%", size: "1.2rem",  rotate: -8 },
  { text: "AI Developer",    x: "65%", y: "14%", size: "1rem",    rotate: 5 },
  { text: "Full-Stack Web",     x: "73%", y: "56%", size: "1.25rem", rotate: -3 },
  { text: "Unity Game Dev",     x: "10%", y: "66%", size: "1.05rem", rotate: 6 },
  { text: "iOS Development",    x: "58%", y: "78%", size: "0.95rem", rotate: -4 },
  { text: "JavaScript",         x: "20%", y: "82%", size: "1rem",    rotate: 2 },
  { text: "前端开发",            x: "78%", y: "34%", size: "1.15rem", rotate: -6 },
  { text: "游戏开发",            x: "15%", y: "44%", size: "0.9rem",  rotate: 4 },
  { text: "Software Development", x: "40%", y: "8%",  size: "1.1rem",  rotate: -2 },
  { text: "软件开发",            x: "42%", y: "90%", size: "1rem",    rotate: 3 },
]

/* 滚动过渡参数：总距离 + 头像尺寸 + 断点 + 淡入淡出区间 */
const SCROLL_DISTANCE = 600
const SHOWCASE_AVATAR_MAX = 380
const SHOWCASE_AVATAR_MOBILE = 300
const MOBILE_BREAKPOINT = 640
const FADE_OUT_END = 0.5
const FADE_IN_START = 0.4
const NORMAL_SLIDE_UP = 200

/* 数学工具：钳制 0-1 / 线性插值 */
function clamp01(v) { return Math.max(0, Math.min(1, v)) }
function lerp(a, b, t) { return a + (b - a) * t }

export default function HeroSection() {
  /* DOM 引用 + 动画状态 ref（直接改 DOM，不触发 React 重渲染） */
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const normalAvatarRef = useRef(null)
  const showcaseLayerRef = useRef(null)
  const normalLayerRef = useRef(null)
  const floatingAvatarRef = useRef(null)
  const progressRef = useRef(0)
  const avatarPosRef = useRef(null)
  const rafRef = useRef(null)
  const isMobileRef = useRef(false)
  const sectionTopRef = useRef(0) // 缓存 offsetTop，避免滚动中反复 getBoundingClientRect

  /* 按滚动进度直接改 DOM 样式：移动端只改透明度，桌面端做全套动画 */
  const applyStyles = useCallback(() => {
    const p = progressRef.current

    // 移动端：只淡入淡出
    if (isMobileRef.current) {
      const showcaseOpacity = clamp01(1 - p / FADE_OUT_END)
      const normalOpacity = clamp01((p - FADE_IN_START) / (1 - FADE_IN_START))
      if (showcaseLayerRef.current) showcaseLayerRef.current.style.opacity = showcaseOpacity
      if (normalLayerRef.current) normalLayerRef.current.style.opacity = normalOpacity
      return
    }

    // 桌面端：展示层淡出 / 正常层上滑淡入 / 浮动头像位移缩放
    const pos = avatarPosRef.current

    const showcaseOpacity = clamp01(1 - p / FADE_OUT_END)
    if (showcaseLayerRef.current) {
      showcaseLayerRef.current.style.opacity = showcaseOpacity
      showcaseLayerRef.current.style.pointerEvents = showcaseOpacity < 0.1 ? "none" : "auto"
    }

    const normalOpacity = clamp01((p - FADE_IN_START) / (1 - FADE_IN_START))
    const normalTranslateY = (1 - normalOpacity) * NORMAL_SLIDE_UP
    if (normalLayerRef.current) {
      normalLayerRef.current.style.opacity = normalOpacity
      normalLayerRef.current.style.transform = `translateY(${normalTranslateY}px)`
      normalLayerRef.current.style.pointerEvents = normalOpacity < 0.1 ? "none" : "auto"
    }

    if (floatingAvatarRef.current && pos) {
      const size = lerp(pos.sSize, pos.tSize, p)
      const cx = lerp(pos.sx, pos.tx, p)
      const cy = lerp(pos.sy, pos.ty, p)
      const glowFade = clamp01(p * 2)
      const el = floatingAvatarRef.current
      el.style.left = `${cx - size / 2}px`
      el.style.top = `${cy - size / 2}px`
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.border = `2px solid rgba(255, 215, 0, ${lerp(0.3, 0.25, p)})`
      el.style.boxShadow = `0 0 ${lerp(80, 40, glowFade)}px rgba(255, 215, 0, ${lerp(0.12, 0.08, glowFade)}), 0 0 ${lerp(160, 80, glowFade)}px rgba(255, 215, 0, ${lerp(0.06, 0, glowFade)})`
    }

    // 桌面端隐藏正常层头像占位（由浮动头像覆盖）
    if (normalAvatarRef.current) {
      normalAvatarRef.current.style.visibility = "hidden"
    }
  }, [])

  /* 滚动监听：rAF 节流，计算 progress 后 apply */
  useEffect(() => {
    const cacheTop = () => {
      if (sectionRef.current) {
        sectionTopRef.current = sectionRef.current.offsetTop
      }
    }
    cacheTop()

    const onScroll = () => {
      const scrolled = Math.max(0, window.scrollY - sectionTopRef.current)
      progressRef.current = Math.min(1, scrolled / SCROLL_DISTANCE)

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(applyStyles)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", cacheTop)
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", cacheTop)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [applyStyles])

  /* 测量头像起点（展示层中心）与终点（正常层占位）位置，移动端跳过 */
  useEffect(() => {
    const measure = () => {
      if (!normalAvatarRef.current || !stickyRef.current || !normalLayerRef.current) return

      isMobileRef.current = window.innerWidth < MOBILE_BREAKPOINT

      // 移动端：不测量 / 不显示浮动头像 / 不做位移
      if (isMobileRef.current) {
        if (floatingAvatarRef.current) floatingAvatarRef.current.style.display = "none"
        if (normalAvatarRef.current) normalAvatarRef.current.style.visibility = "visible"
        normalLayerRef.current.style.transform = "none"
        normalLayerRef.current.style.pointerEvents = "auto"
        applyStyles()
        return
      }

      // 暂时清 transform，否则 getBoundingClientRect 拿到的是位移后的位置
      const savedTransform = normalLayerRef.current.style.transform
      normalLayerRef.current.style.transform = "translateY(0px)"

      const sb = stickyRef.current.getBoundingClientRect()
      const ab = normalAvatarRef.current.getBoundingClientRect()
      const srcSize = SHOWCASE_AVATAR_MAX

      avatarPosRef.current = {
        sx: sb.width / 2,
        sy: sb.height / 2,
        sSize: srcSize,
        tx: ab.left + ab.width / 2 - sb.left,
        ty: ab.top + ab.height / 2 - sb.top,
        tSize: ab.width,
      }

      normalLayerRef.current.style.transform = savedTransform
      applyStyles()
    }
    const timer = setTimeout(measure, 50)
    window.addEventListener("resize", measure)
    return () => { clearTimeout(timer); window.removeEventListener("resize", measure) }
  }, [applyStyles])

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(100vh + ${SCROLL_DISTANCE}px)` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen"
        style={{
          fontFamily: "var(--font-quicksand)",
          display: "grid",
          gridTemplate: "1fr / 1fr",
          alignItems: "center",
          paddingTop: "5rem",
          paddingBottom: "2rem",
        }}
      >

        {/* 正常层：左头像占位 + Quote，右姓名 / 方向 / 学历三级信息 */}
        <div
          ref={normalLayerRef}
          className="px-10 md:px-20 lg:px-32"
          style={{
            gridArea: "1 / 1",
            opacity: 0,
            transform: `translateY(${NORMAL_SLIDE_UP}px)`,
            pointerEvents: "none",
          }}
        >
          <div className="w-full flex flex-col md:flex-row gap-6 md:gap-16 items-center">

            {/* 左：头像占位 + 拉丁语 Quote */}
            <div className="flex flex-col items-center gap-3 md:gap-5 md:w-1/3 flex-shrink-0">
              <div
                ref={normalAvatarRef}
                className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden"
                style={{
                  border: "2px solid rgba(255, 215, 0, 0.25)",
                  boxShadow: "0 0 40px rgba(255, 215, 0, 0.08)",
                  visibility: "hidden",
                }}
              >
                <img
                  src="/yellow.jpg"
                  alt="Otto Ma"
                  className="w-full h-full object-cover"
                  style={{ transform: "scale(1.7)" }}
                />
              </div>
              <p className="text-sm md:text-base text-gray-500 text-center tracking-wide italic">
                &ldquo;Non terrae plus ultra!&rdquo;
              </p>
            </div>

            {/* 左右竖向分隔线 */}
            <div
              className="hidden md:block w-px self-stretch"
              style={{ background: "rgba(255, 255, 255, 0.07)" }}
            />

            {/* 右：姓名 / 方向 / 学历 三级信息 */}
            <div className="flex flex-col gap-4 md:gap-8 md:w-2/3">

              <div className="flex flex-col gap-1">
                <h1
                  className="text-4xl md:text-6xl font-bold text-white leading-tight"
                  style={{ fontFamily: "var(--font-noto-sc)", letterSpacing: "0.05em" }}
                >
                  马超越昊
                </h1>
                <h2
                  className="text-2xl md:text-4xl font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-quicksand)",
                    color: "rgba(255, 210, 0, 0.82)",
                  }}
                >
                  Otto Ma
                </h2>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  前端/全栈 Web 开发、Unity 游戏开发、iOS 移动端应用开发与软件开发
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Front-End / Full-Stack Web · Unity Game Development · iOS Mobile App Development · Software Development
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 text-xs flex-shrink-0"
                    style={{ color: "rgba(255, 210, 0, 0.35)" }}
                  >
                    ▸
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm text-gray-400 font-semibold">
                      硕士 · 计算机科学
                      <span className="ml-2 font-normal text-gray-400">Master&apos;s in Computer Science</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      2025–2026 &nbsp;·&nbsp; 华盛顿大学圣路易斯分校 &nbsp;·&nbsp; Washington University in St. Louis
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 text-xs flex-shrink-0"
                    style={{ color: "rgba(255, 210, 0, 0.35)" }}
                  >
                    ▸
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm text-gray-400 font-semibold">
                      本科 · 计算机科学
                      <span className="ml-2 font-normal text-gray-400">Bachelor&apos;s in Computer Science</span>
                    </p>
                    <p className="text-xs text-gray-600">
                      2022–2025 &nbsp;·&nbsp; 华盛顿大学圣路易斯分校 &nbsp;·&nbsp; Washington University in St. Louis
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 展示层：漂浮文字 + 移动端居中头像 */}
        <div
          ref={showcaseLayerRef}
          className="overflow-hidden"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            opacity: 1,
            pointerEvents: "auto",
          }}
        >
          <div
            className="block md:hidden rounded-full overflow-hidden"
            style={{
              width: SHOWCASE_AVATAR_MOBILE,
              height: SHOWCASE_AVATAR_MOBILE,
              border: "2px solid rgba(255, 215, 0, 0.3)",
              boxShadow: "0 0 80px rgba(255, 215, 0, 0.12), 0 0 160px rgba(255, 215, 0, 0.06)",
            }}
          >
            <img
              src="/yellow.jpg"
              alt="Otto Ma"
              className="w-full h-full object-cover"
              style={{ transform: "scale(1.7)" }}
            />
          </div>

          {FLOATING_TEXTS.map((item, i) => (
            <span
              key={i}
              className="hero-floating-text"
              style={{
                left: item.x,
                top: item.y,
                fontSize: item.size,
                "--ft-rotate": `${item.rotate}deg`,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              {item.text}
            </span>
          ))}
        </div>

        {/* 浮动头像（桌面限定）：从展示中心渐变到正常层位置，hover 切换真人照 */}
        <div
          ref={floatingAvatarRef}
          className="hero-avatar"
          style={{
            position: "absolute",
            zIndex: 20,
            borderRadius: "9999px",
            overflow: "hidden",
            willChange: "left, top, width, height",
          }}
        >
          <img
            src="/yellow.jpg"
            alt="Otto Ma"
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              transform: "scale(1.7)",
            }}
          />
          <img
            src="/blackav.jpg"
            alt="Otto Ma"
            className="hero-avatar-img-hover"
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              transform: "scale(1.05)",
            }}
          />
        </div>

      </div>
    </section>
  )
}