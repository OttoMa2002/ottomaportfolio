import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const POSTS_DIR = path.join(process.cwd(), "content/posts")

/* 读目录并解析 frontmatter，按日期倒序返回文章列表 */
export function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))
  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8")
    const { data } = matter(raw)
    const slug = data.slug || filename.replace(/\.mdx$/, "")
    return {
      slug,
      title: data.title || slug,
      date: data.date ? String(data.date).slice(0, 10) : "",
      excerpt: data.excerpt || "",
      tags: data.tags || [],
    }
  })
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

/* 按 slug 读单篇，返回元信息 + MDX 正文原文 */
export function getPostBySlug(slug) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return {
    metadata: {
      slug: data.slug || slug,
      title: data.title || slug,
      date: data.date ? String(data.date).slice(0, 10) : "",
      excerpt: data.excerpt || "",
      tags: data.tags || [],
    },
    content,
  }
}