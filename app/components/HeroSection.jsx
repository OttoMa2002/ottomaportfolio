export default function HeroSection() {
  return (
    <section
      className="flex items-center px-10 md:px-20 lg:px-32 pt-36 md:pt-32 pb-24"
      style={{ fontFamily: "var(--font-quicksand)" }}
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
            "Non terrae plus ultra!"
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
                  <span className="ml-2 font-normal text-gray-400">Master's in Computer Science</span>
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
                  <span className="ml-2 font-normal text-gray-400">Bachelor's in Computer Science</span>
                </p>
                <p className="text-xs text-gray-600">
                  2022–2025 &nbsp;·&nbsp; 华盛顿大学圣路易斯分校 &nbsp;·&nbsp; Washington University in St. Louis
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}