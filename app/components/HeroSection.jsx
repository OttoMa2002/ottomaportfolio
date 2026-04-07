"use client"

import { useState, useEffect, useRef } from "react"

/* ═══════════════════════════════════════════════════════════
   CONFIGURABLE: Floating texts around the showcase avatar
   ═══════════════════════════════════════════════════════════ */
const FLOATING_TEXTS = [
  { text: "Creative Developer",  x: "8%",  y: "22%", size: "1.2rem",  rotate: -8 },
  { text: "React / Next.js",    x: "65%", y: "14%", size: "1rem",    rotate: 5 },
  { text: "Full-Stack Web",     x: "73%", y: "56%", size: "1.25rem", rotate: -3 },
  { text: "Unity Game Dev",     x: "10%", y: "66%", size: "1.05rem", rotate: 6 },
  { text: "iOS Development",    x: "58%", y: "78%", size: "0.95rem", rotate: -4 },
  { text: "TypeScript",         x: "20%", y: "82%", size: "1rem",    rotate: 2 },
  { text: "前端开发",            x: "78%", y: "34%", size: "1.15rem", rotate: -6 },
  { text: "游戏开发",            x: "15%", y: "44%", size: "0.9rem",  rotate: 4 },
]

/* ═══════════════════════════════════════════════════════════
   CONFIGURABLE: Animation parameters
   ═══════════════════════════════════════════════════════════ */
const SCROLL_DISTANCE = 600       // px of scroll for full transition
const SHOWCASE_AVATAR_SIZE = 380  // px, showcase mode avatar size
const SHOWCASE_AVATAR_GLOW = "0 0 80px rgba(255, 215, 0, 0.12), 0 0 160px rgba(255, 215, 0, 0.06)"

// Showcase fades out over 0 → FADE_OUT_END of progress
// Normal fades in over FADE_IN_START → 1 of progress
const FADE_OUT_END = 0.5
const FADE_IN_START = 0.4

/* ─── Helpers ─── */
function clamp01(v) { return Math.max(0, Math.min(1, v)) }

export default function HeroSection() {
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const scrolled = Math.max(0, -sectionRef.current.getBoundingClientRect().top)
      setProgress(Math.min(1, scrolled / SCROLL_DISTANCE))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Both driven by the same progress
  const showcaseOpacity = clamp01(1 - progress / FADE_OUT_END)
  const normalOpacity = clamp01((progress - FADE_IN_START) / (1 - FADE_IN_START))

  return (
    <section
      ref={sectionRef}
      style={{ height: `calc(100vh + ${SCROLL_DISTANCE}px)` }}
    >
      <div
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
          className="px-10 md:px-20 lg:px-32"
          style={{
            gridArea: "1 / 1",
            opacity: normalOpacity,
            pointerEvents: normalOpacity < 0.1 ? "none" : "auto",
          }}
        >
          <div className="w-full flex flex-col md:flex-row gap-14 md:gap-16 items-center">

            {/* Left: Avatar + Quote */}
            <div className="flex flex-col items-center gap-5 md:w-1/3 flex-shrink-0">
              <div
                className="w-56 h-56 rounded-full overflow-hidden"
                style={{
                  border: "2px solid rgba(255, 215, 0, 0.25)",
                  boxShadow: "0 0 40px rgba(255, 215, 0, 0.08)",
                }}
              >
                <img
                  src="/avatar.jpg"
                  alt="Otto Ma"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-base text-gray-500 text-center tracking-wide italic">
                &ldquo;Non terrae plus ultra!&rdquo;
              </p>
            </div>

            {/* Divider */}
            <div
              className="hidden md:block w-px self-stretch"
              style={{ background: "rgba(255, 255, 255, 0.07)" }}
            />

            {/* Right: Info */}
            <div className="flex flex-col gap-8 md:w-2/3">

              {/* Level 1: Names */}
              <div className="flex flex-col gap-1">
                <h1
                  className="text-5xl md:text-6xl font-bold text-white leading-tight"
                  style={{ fontFamily: "var(--font-noto-sc)", letterSpacing: "0.05em" }}
                >
                  马超越昊
                </h1>
                <h2
                  className="text-3xl md:text-4xl font-bold leading-tight"
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

        {/* ═══ Showcase Layer (absolute overlay, fades out) ═══ */}
        <div
          className="overflow-hidden"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            opacity: showcaseOpacity,
            pointerEvents: showcaseOpacity < 0.1 ? "none" : "auto",
          }}
        >
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

          {/* Large centered avatar */}
          <div
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{
              width: SHOWCASE_AVATAR_SIZE,
              height: SHOWCASE_AVATAR_SIZE,
              transform: `scale(${1 - progress * 0.3})`,
              border: "2px solid rgba(255, 215, 0, 0.3)",
              boxShadow: SHOWCASE_AVATAR_GLOW,
              transition: "transform 0.1s linear",
            }}
          >
            <img src="/avatar.jpg" alt="Otto Ma" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </section>
  )
}
