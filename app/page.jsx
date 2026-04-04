import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div
      className="relative min-h-screen text-white overflow-hidden"
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

      {/* Placeholder content for scroll testing */}
      <div
        className="pt-24 pb-20 px-10"
        style={{ fontFamily: "var(--font-quicksand)" }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">
              Section {i}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}