import Link from "next/link"

export default function BlogSection() {
  return (
    <section
      className="px-8 md:px-16 lg:px-24 pt-6 md:pt-8 pb-10 md:pb-14 mt-[-16vh] md:mt-[-20vh] relative z-8"
      style={{ fontFamily: "var(--font-quicksand)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* ═══ Section Title — 同尺寸，颜色区分，并列 ═══ */}
        <div className="mb-6 md:mb-10 flex flex-row items-baseline gap-3 md:gap-5 flex-wrap">
          <h2
            className="text-2xl md:text-4xl font-semibold text-gray-300 leading-none"
            style={{ fontFamily: "var(--font-noto-sc)", letterSpacing: "0.05em" }}
          >
            个人博客
          </h2>
          <p
            className="text-2xl md:text-4xl font-bold tracking-wide leading-none"
            style={{
              fontFamily: "var(--font-fredoka)",
              color: "rgba(255, 210, 0, 0.82)",
            }}
          >
            Blog
          </p>
        </div>

        {/* ═══ Main content: left 30% / right 70% ═══ */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-stretch md:min-h-[17rem]">

          {/* Left 30%: cursive Enter — clickable link to /blog */}
          <Link
            href="/blog"
            className="blog-enter group md:w-[30%] flex items-center justify-center py-6 md:py-0"
            aria-label="进入博客"
          >
            <span
              className="blog-enter-text"
              style={{ fontFamily: "var(--font-great-vibes)" }}
            >
              Enter
            </span>
          </Link>

          {/* Divider */}
          <div
            className="hidden md:block w-px self-stretch"
            style={{ background: "rgba(255, 255, 255, 0.07)" }}
          />

          {/* Right 70%: text block — upper 40% / lower 60%，内容居中 */}
          <div className="md:w-[70%] flex flex-col">

            {/* Upper 40%: poetic intro */}
            <div className="flex flex-col justify-center md:flex-[2_2_0%]">
              <div className="w-fit mx-auto flex flex-col gap-2 md:gap-3">
                <p
                  className="text-xl md:text-2xl text-gray-300 leading-relaxed"
                  style={{ fontFamily: "var(--font-noto-sc)", letterSpacing: "0.05em" }}
                >
                  一些思考
                </p>
                <p
                  className="text-xl md:text-2xl text-gray-400 leading-relaxed"
                  style={{ fontFamily: "var(--font-noto-sc)", letterSpacing: "0.05em", paddingLeft: "1.5rem" }}
                >
                  一些碎碎念
                </p>
                <p
                  className="text-xl md:text-2xl text-gray-500 leading-relaxed italic"
                  style={{ fontFamily: "var(--font-noto-sc)", letterSpacing: "0.05em", paddingLeft: "3rem" }}
                >
                  需要和不需要记录的
                </p>
              </div>
            </div>

            {/* Divider line */}
            <div
              className="h-px w-full my-4 md:my-5"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,215,0,0.2), rgba(255,255,255,0.05), transparent)",
              }}
            />

            {/* Lower 60%: recent posts placeholder */}
            <div className="flex flex-col justify-center md:flex-[3_3_0%]">
              <div className="w-fit mx-auto flex flex-col gap-3 text-center">
                <p
                  className="text-xs md:text-sm text-gray-500 tracking-widest uppercase mb-2"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  Recent Posts · 最近文章
                </p>
                <p className="text-sm text-gray-600 italic">
                  文章正在路上，敬请期待…
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}