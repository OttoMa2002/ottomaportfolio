import Link from "next/link"
import { getAllPosts } from "../../lib/posts"

export const metadata = {
  title: "Blog | Otto's",
  description: "Otto 的博客 — 记录设计、代码与思考",
}

export default function BlogPage() {
  const posts = getAllPosts()

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

        {posts.length === 0 ? (
          <div className="text-gray-500 italic">文章正在路上，敬请期待…</div>
        ) : (
          <ul className="flex flex-col gap-10">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="border-b border-white/10 pb-8 last:border-b-0"
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2
                    className="text-2xl md:text-3xl font-semibold text-gray-100 group-hover:text-yellow-400 transition-colors mb-2"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="text-xs text-gray-500 mb-3"
                    style={{ fontFamily: "var(--font-quicksand)" }}
                  >
                    {post.date}
                  </p>
                  {post.excerpt && (
                    <p
                      className="text-base text-gray-400 leading-relaxed"
                      style={{ fontFamily: "var(--font-noto-sc)" }}
                    >
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}