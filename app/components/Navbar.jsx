"use client"

import { useState } from "react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6"
      style={{
        background: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 20px rgba(255, 215, 0, 0.3)",
      }}
    >
      {/* Left - Otto's with glow effect */}
      <div
        className="text-5xl font-bold"
        style={{
          fontFamily: "var(--font-fredoka)",
          textShadow:
            "0 0 10px rgba(255, 215, 0, 0.8), 0 0 25px rgba(255, 215, 0, 0.5), 0 0 50px rgba(255, 215, 0, 0.3)",
        }}
      >
        OTTO&apos;S
      </div>

      {/* Center - Welcome marquee */}
      <div
        className="flex-1 mx-12 overflow-hidden max-w-md"
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
      <div className="relative" style={{ fontFamily: "var(--font-quicksand)" }}>
        <button
          className="text-xl font-medium text-gray-300 hover:text-gray-200 hover:scale-125 transition-all duration-200 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Navigation ▾
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg py-2"
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
        )}
      </div>
    </nav>
  )
}