import { useState } from 'react'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="relative min-h-screen text-white overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1508 50%, #0d0b04 100%)' }}
    >
      {/* Background glow effects */}
      <div
        className="fixed top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255, 200, 50, 0.08)', filter: 'blur(150px)' }}
      />
      <div
        className="fixed bottom-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255, 200, 50, 0.06)', filter: 'blur(150px)' }}
      />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6"
        style={{ background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)' }}>
        {/* Left - Otto's with glow effect */}
        <div
          className="text-5xl font-bold"
          style={{
            fontFamily: "'Fredoka', sans-serif",
            textShadow:
              '0 0 10px rgba(255, 215, 0, 0.8), 0 0 25px rgba(255, 215, 0, 0.5), 0 0 50px rgba(255, 215, 0, 0.3)',
          }}
        >
          OTTO'S
        </div>

        {/* Center - Welcome marquee */}
        <div
          className="flex-1 mx-12 overflow-hidden max-w-md"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <div
            className="inline-flex whitespace-nowrap text-2xl font-semibold text-gray-300 animate-marquee"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
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
        <div className="relative" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          <button
            className="text-xl font-medium text-gray-300 hover:text-gray-200 hover:scale-125 transition-all duration-200 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Navigation ▾
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg py-2"
              style={{ background: 'rgba(20, 20, 20, 0.95)', backdropFilter: 'blur(10px)' }}>
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

      {/* Placeholder content for scroll testing */}
      <div className="pt-24 pb-20 px-10" style={{ fontFamily: "'Quicksand', sans-serif" }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">Section {i}</h2>
            <p className="text-gray-400 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer
        className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-10 py-4 border-t border-white/10"
        style={{ background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(10px)', fontFamily: "'Quicksand', sans-serif" }}
      >
        {/* Left - Copyright */}
        <div className="text-sm text-gray-300">
          © 2026 Otto Ma. All rights reserved.
        </div>

        {/* Right - Social icons */}
        <div className="flex gap-5 text-gray-300">
          <a href="#" className="hover:text-gray-200 hover:scale-125 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="currentColor"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M16 3a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8Zm-4 5a4 4 0 1 0 0 8a4 4 0 0 0 0-8Zm0 2a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm4.5-3.5a1 1 0 1 0 0 2a1 1 0 0 0 0-2Z"/></g></svg>
          </a>
          <a href="#" className="hover:text-gray-200 hover:scale-125 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 416" fill="currentColor"><path d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z"/></svg>
          </a>
          <a href="#" className="hover:text-gray-200 hover:scale-125 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 3.5h-2.38l.94-.94a1.49 1.49 0 0 0 0-2.12a1.51 1.51 0 0 0-2.12 0L12.88 3.5h-1.76L8.06.44a1.51 1.51 0 0 0-2.12 0a1.49 1.49 0 0 0 0 2.12l.94.94H4.5A4.51 4.51 0 0 0 0 8v10a4.51 4.51 0 0 0 4.5 4.5H5a1.75 1.75 0 0 0 3.46 0h7a1.75 1.75 0 0 0 3.46 0h.52A4.51 4.51 0 0 0 24 18V8a4.51 4.51 0 0 0-4.5-4.5M21 18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18V8a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 8Z"/><path d="M15 15.1a.73.73 0 0 0-.87.57a.54.54 0 0 1-.34.08c-.65 0-1-1-1-1a.76.76 0 0 0-.71-.49a.76.76 0 0 0-.7.49s-.4 1-1.05 1c-.23 0-.32-.06-.32 0a.75.75 0 0 0-1.55.25a1.69 1.69 0 0 0 1.79 1.24a2.35 2.35 0 0 0 1.75-.82a2.35 2.35 0 0 0 1.75.83A1.69 1.69 0 0 0 15.54 16a.77.77 0 0 0-.54-.9m-5.24-4.45a.74.74 0 0 0-.88-.58l-3.94.8a.75.75 0 0 0-.59.89a.77.77 0 0 0 .74.6h.15l3.94-.8a.76.76 0 0 0 .58-.91m9.3.22l-3.94-.8a.74.74 0 0 0-.88.58a.76.76 0 0 0 .58.89l3.94.8h.15a.77.77 0 0 0 .74-.6a.75.75 0 0 0-.59-.87"/></svg>
          </a>
          <a href="#" className="hover:text-gray-200 hover:scale-125 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 432 384" fill="currentColor"><path d="M384 21q18 0 30.5 12.5T427 64v256q0 18-12.5 30.5T384 363H43q-18 0-30.5-12.5T0 320V64q0-18 12.5-30.5T43 21h341zm0 86V64L213 171L43 64v43l170 106z"/></svg>
          </a>
          <a href="#" className="hover:text-gray-200 hover:scale-125 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213c0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098a10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05c-.857-2.578.157-4.972 1.932-6.446c1.703-1.415 3.882-1.98 5.853-1.838c-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178a1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786c-1.72 1.428-2.687 3.72-1.78 6.22c.942 2.453 3.666 4.229 6.884 4.229c.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247c0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156a.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983a.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983a.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/></svg>
          </a>
          <a href="#" className="hover:text-gray-200 hover:scale-125 transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M12.2 10c-1.1-.1-1.7 1.4-2.5 1.8C8.4 12.5 6 10 6 10S3.5 7.6 4.1 6.3c.5-.8 2-1.4 1.9-2.5c-.1-1-2.3-4.6-3.4-3.6C.2 2.4 0 3.3 0 5.1c-.1 3.1 3.9 7 3.9 7c.4.4 3.9 4 7 3.9c1.8 0 2.7-.2 4.9-2.6c1-1.1-2.5-3.3-3.6-3.4z"/></svg>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App