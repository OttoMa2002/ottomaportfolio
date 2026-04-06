import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HeroSection from "./components/HeroSection"

export default function Home() {
  return (
    <div
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1508 50%, #0d0b04 100%)",
      }}
    >
      {/* Background glow effects */}
      <div
        className="fixed top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "rgba(255, 200, 50, 0.08)",
          filter: "blur(150px)",
        }}
      />
      <div
        className="fixed bottom-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "rgba(255, 200, 50, 0.06)",
          filter: "blur(150px)",
        }}
      />

      <Navbar />

      <HeroSection />

      {/* Placeholder sections for scroll testing */}
      <div className="px-8 md:px-16 lg:px-24 pb-28" style={{ fontFamily: "var(--font-quicksand)" }}>
        {[2, 3, 4].map((i) => (
          <div key={i} className="mb-20 max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-500 mb-3">Section {i}</h2>
            <div className="h-px w-full mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />
            <p className="text-gray-600 leading-relaxed">占位内容，待替换。</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}