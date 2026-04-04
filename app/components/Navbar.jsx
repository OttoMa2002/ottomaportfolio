"use client"

import { useState, useEffect } from "react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 transition-all duration-400 nav-bg ${scrolled ? "py-3" : "py-6"}`}
      style={{
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(255, 215, 0, 0.3)",
      }}
    >
      {/* Left - Otto's with glow + flame effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="flame-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03 0.05"
            numOctaves="3"
            seed="2"
          >
            <animate
              attributeName="baseFrequency"
              values="0.02 0.04;0.06 0.12;0.025 0.05;0.055 0.1;0.02 0.04"
              dur="5s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            scale="16"
            xChannelSelector="G"
            yChannelSelector="R"
          />
        </filter>
      </svg>
      <div
        className={`font-bold transition-all duration-400 cursor-pointer otto-glow flame-text text-white ${scrolled ? "text-3xl flame-off" : "text-5xl"}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ fontFamily: "var(--font-fredoka)", position: "relative", zIndex: 0 }}
        data-text="OTTO'S"
      >
        OTTO&apos;S
      </div>

      {/* Center - Welcome marquee (hidden when scrolled) */}
      <div
        className={`flex-1 mx-12 overflow-hidden max-w-md transition-all duration-400 ${scrolled ? "opacity-0 max-h-0" : "opacity-100 max-h-20"}`}
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div
          className="inline-flex whitespace-nowrap text-2xl font-semibold text-gray-300 animate-marquee"
          style={{ fontFamily: "var(--font-quicksand)" }}
        >
          <span className="inline-flex gap-5 pr-5">Welcome</span>
          <span className="inline-flex gap-5 pr-5">欢迎</span>
          <span className="inline-flex gap-5 pr-5">歡迎</span>
          <span className="inline-flex gap-5 pr-5">ようこそ</span>
          <span className="inline-flex gap-5 pr-5">환영합니다</span>
          <span className="inline-flex gap-5 pr-5">Bienvenue</span>
          <span className="inline-flex gap-5 pr-5">Bienvenido</span>
          <span className="inline-flex gap-5 pr-5">Bem-vindo</span>
          <span className="inline-flex gap-5 pr-5">Welcome</span>
          <span className="inline-flex gap-5 pr-5">欢迎</span>
          <span className="inline-flex gap-5 pr-5">歡迎</span>
          <span className="inline-flex gap-5 pr-5">ようこそ</span>
          <span className="inline-flex gap-5 pr-5">환영합니다</span>
          <span className="inline-flex gap-5 pr-5">Bienvenue</span>
          <span className="inline-flex gap-5 pr-5">Bienvenido</span>
          <span className="inline-flex gap-5 pr-5">Bem-vindo</span>
        </div>
      </div>

      {/* Right - Navigation dropdown */}
      <div
        className="relative"
        style={{ fontFamily: "var(--font-quicksand)" }}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <button
          className={`font-medium text-gray-300 hover:text-gray-200 hover:scale-125 transition-all duration-400 cursor-pointer ${scrolled ? "text-base" : "text-xl"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Navigation ▾
        </button>

        {menuOpen && (
          <div className="absolute right-0 pt-2 w-40">
          <div
            className="rounded-lg shadow-lg py-2"
            style={{
              background: "rgba(20, 20, 20, 0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <button className="block w-full text-left px-4 py-2 text-gray-300 hover:text-gray-200 hover:bg-white/5 transition-colors cursor-pointer">
              About
            </button>
            <button className="block w-full text-left px-4 py-2 text-gray-300 hover:text-gray-200 hover:bg-white/5 transition-colors cursor-pointer">
              Projects
            </button>
            <button className="block w-full text-left px-4 py-2 text-gray-300 hover:text-gray-200 hover:bg-white/5 transition-colors cursor-pointer">
              Contact
            </button>
          </div>
          </div>
        )}
      </div>
    </nav>
  )
}