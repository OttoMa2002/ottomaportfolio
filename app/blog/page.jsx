export const metadata = {
  title: "Blog | Otto's",
  description: "Otto 的博客 — 记录设计、代码与思考",
}

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 text-white">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Blog
        </h1>
        <p
          className="text-lg md:text-xl text-gray-400 mb-16"
          style={{ fontFamily: "var(--font-noto-sc)" }}
        >
          记录设计、代码与一些随想。
        </p>

        {/* 文章列表占位 — 之后接入 MDX/数据库后动态渲染 */}
        <div className="text-gray-500 italic">
          文章正在路上，敬请期待…
        </div>
      </div>
    </main>
  )
}