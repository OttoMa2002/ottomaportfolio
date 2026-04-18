import SocialLinks from "./SocialLinks"

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 flex flex-col md:flex-row items-center justify-between px-10 py-3 md:py-4 gap-2 md:gap-0 border-t border-white/10"
      style={{
        background: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(10px)",
        fontFamily: "var(--font-quicksand)",
      }}
    >
      {/* 左：版权 · 右：社交图标 */}
      <div className="text-sm text-gray-300">
        &copy; 2026 Otto Ma. All rights reserved.
      </div>
      <SocialLinks />
    </footer>
  )
}