import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "../../../lib/posts"

/* 构建时生成所有文章的静态路径 */
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

/* 每篇文章独立 SEO 元信息 */
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.metadata.title} | Otto's Blog`,
    description: post.metadata.excerpt,
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 text-white">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-block mb-8 text-sm text-gray-400 hover:text-yellow-400 transition-colors"
          style={{ fontFamily: "var(--font-quicksand)" }}
        >
          返回
        </Link>

        <header className="mb-10 border-b border-white/10 pb-6">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {post.metadata.title}
          </h1>
          <p
            className="text-sm text-gray-500"
            style={{ fontFamily: "var(--font-quicksand)" }}
          >
            {post.metadata.date}
          </p>
        </header>

        {/* MDX 正文：基础排版样式走 tailwind prose（需要 @tailwindcss/typography），这里先用原生 */}
        <div
          className="blog-content text-gray-200 leading-relaxed space-y-4"
          style={{ fontFamily: "var(--font-noto-sc)" }}
        >
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  )
}