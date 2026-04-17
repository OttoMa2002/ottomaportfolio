"use client"

import { useEffect, useRef, useCallback } from "react"

/* ═══════════════════════════════════════════════════════════
   CONFIGURABLE: Floating texts around the showcase avatar
   ═══════════════════════════════════════════════════════════ */
const FLOATING_TEXTS = [
  { text: "Creative Developer",  x: "8%",  y: "22%", size: "1.2rem",  rotate: -8 },
  { text: "AI Developer",    x: "65%", y: "14%", size: "1rem",    rotate: 5 },
  { text: "Full-Stack Web",     x: "73%", y: "56%", size: "1.25rem", rotate: -3 },
  { text: "Unity Game Dev",     x: "10%", y: "66%", size: "1.05rem", rotate: 6 },
  { text: "iOS Development",    x: "58%", y: "78%", size: "0.95rem", rotate: -4 },
  { text: "JavaScript",         x: "20%", y: "82%", size: "1rem",    rotate: 2 },
  { text: "前端开发",            x: "78%", y: "34%", size: "1.15rem", rotate: -6 },
  { text: "游戏开发",            x: "15%", y: "44%", size: "0.9rem",  rotate: 4 },
]

/* ═══════════════════════════════════════════════════════════
   CONFIGURABLE: Animation parameters
   ═══════════════════════════════════════════════════════════ */
const SCROLL_DISTANCE = 600       // px of scroll for full transition
const SHOWCASE_AVATAR_MAX = 380   // px, showcase avatar on desktop
const SHOWCASE_AVATAR_MOBILE = 300 // px, showcase avatar on small screens
const MOBILE_BREAKPOINT = 640     // px
// Showcase fades out over 0 → FADE_OUT_END of progress
// Normal fades in over FADE_IN_START → 1 of progress
const FADE_OUT_END = 0.5
const FADE_IN_START = 0.4
const NORMAL_SLIDE_UP = 200  // px of upward travel during fade-in

/* ─── Helpers ─── */
function clamp01(v) { return Math.max(0, Math.min(1, v)) }
function lerp(a, b, t) { return a + (b - a) * t }

export default function HeroSection() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const normalAvatarRef = useRef(null)
  const showcaseLayerRef = useRef(null)
  const normalLayerRef = useRef(null)
  const floatingAvatarRef = useRef(null)

  // Mutable refs for animation state (no re-renders)
  const progressRef = useRef(0)
  const avatarPosRef = useRef(null)
  const rafRef = useRef(null)
  const isMobileRef = useRef(false)
  const sectionTopRef = useRef(0) // cached offsetTop to avoid getBoundingClientRect in scroll

  /* ─── Apply all animated styles directly to DOM ─── */
  const applyStyles = useCallback(() => {
    const p = progressRef.current

    // ── Mobile: only update two opacity values, nothing else ──
    if (isMobileRef.current) {
      const showcaseOpacity = clamp01(1 - p / FADE_OUT_END)
      const normalOpacity = clamp01((p - FADE_IN_START) / (1 - FADE_IN_START))
      if (showcaseLayerRef.current) showcaseLayerRef.current.style.opacity = showcaseOpacity
      if (normalLayerRef.current) normalLayerRef.current.style.opacity = normalOpacity
      return
    }

    // ── Desktop: full animation ──
    const pos = avatarPosRef.current

    // Showcase layer
    const showcaseOpacity = clamp01(1 - p / FADE_OUT_END)
    if (showcaseLayerRef.current) {
      showcaseLayerRef.current.style.opacity = showcaseOpacity
      showcaseLayerRef.current.style.pointerEvents = showcaseOpacity < 0.1 ? "none" : "auto"
    }

    // Normal layer
    const normalOpacity = clamp01((p - FADE_IN_START) / (1 - FADE_IN_START))
    const normalTranslateY = (1 - normalOpacity) * NORMAL_SLIDE_UP
    if (normalLayerRef.current) {
      normalLayerRef.current.style.opacity = normalOpacity
      normalLayerRef.current.style.transform = `translateY(${normalTranslateY}px)`
      normalLayerRef.current.style.pointerEvents = normalOpacity < 0.1 ? "none" : "auto"
    }

    // Floating avatar
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

    // Normal layer avatar visibility — hidden on desktop (floating avatar covers it)
    if (normalAvatarRef.current) {
      normalAvatarRef.current.style.visibility = "hidden"
    }
  }, [])

  /* ─── Scroll tracking via rAF (no setState, no getBoundingClientRect) ─── */
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

  /* ─── Measure avatar source & target positions ─── */
  useEffect(() => {
    const measure = () => {
      if (!normalAvatarRef.current || !stickyRef.current || !normalLayerRef.current) return

      isMobileRef.current = window.innerWidth < MOBILE_BREAKPOINT

      // Mobile: no position measurement, no floating avatar, no translateY
      if (isMobileRef.current) {
        if (floatingAvatarRef.current) floatingAvatarRef.current.style.display = "none"
        if (normalAvatarRef.current) normalAvatarRef.current.style.visibility = "visible"
        normalLayerRef.current.style.transform = "none"
        normalLayerRef.current.style.pointerEvents = "auto"
        applyStyles()
        return
      }

      // Temporarily reset transform so getBoundingClientRect gives the natural position
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

      // Restore transform
      normalLayerRef.current.style.transform = savedTransform

      // Apply immediately after measure
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

        {/* ═══ Normal Layout Layer (grid child, centered by grid) ═══ */}
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

            {/* Left: Avatar placeholder + Quote */}
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

            {/* Divider */}
            <div
              className="hidden md:block w-px self-stretch"
              style={{ background: "rgba(255, 255, 255, 0.07)" }}
            />

            {/* Right: Info */}
            <div className="flex flex-col gap-4 md:gap-8 md:w-2/3">

              {/* Level 1: Names */}
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

              {/* Level 2: Specialization */}
              <div className="flex flex-col gap-1">
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  前端/全栈 Web 开发、Unity 游戏开发与 iOS 移动端应用开发
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Front-End / Full-Stack Web · Unity Game Development · iOS Mobile App Development
                </p>
              </div>

              {/* Level 3: Education */}
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

        {/* ═══ Showcase Layer (floating texts + centered logo on mobile) ═══ */}
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
          {/* Mobile-only showcase avatar (static, no position animation) */}
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

          {/* Floating texts */}
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

        {/* ═══ Floating Avatar (desktop only — morphs from showcase → normal position) ═══ */}
        <div
          ref={floatingAvatarRef}
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
            className="w-full h-full object-cover"
            style={{ transform: "scale(1.7)" }}
          />
        </div>

      </div>
    </section>
  )
}