import matter from "gray-matter";
import { withBase } from "./base.js";

const modules = import.meta.glob("/content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function slugFromPath(path) {
  const file = path.split("/").pop().replace(".md", "");
  return file;
}

export function getAllPosts({ includeDrafts = false } = {}) {
  const posts = Object.entries(modules).map(([path, raw]) => {
    const { data, content } = matter(raw);
    return {
      slug: slugFromPath(path),
      title: data.title || slugFromPath(path),
      date: data.date || "2026-01-01",
      category: data.category || "NOTE",
      section: data.section || "stories",
      style: data.style || "default",
      status: data.status || "shipped",
      stats: Array.isArray(data.stats) ? data.stats : [],
      tags: data.tags || [],
      excerpt: data.excerpt || "",
      cover: data.cover || "#161513",
      coverImage: data.coverImage ? withBase(data.coverImage) : null,
      featured: Boolean(data.featured),
      order: data.order || 99,
      draft: Boolean(data.draft),
      content,
    };
  });

  const filtered = includeDrafts
    ? posts
    : posts.filter((p) => !p.draft);

  return filtered.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return new Date(b.date) - new Date(a.date);
  });
}

export function getPostBySlug(slug) {
  return getAllPosts({ includeDrafts: true }).find(
    (p) => p.slug === slug) || null;
}

export function getCategories() {
  return [...new Set(getAllPosts().map((p) => p.category))];
}

export function getSections() {
  return [...new Set(getAllPosts().map((p) => p.section))];
}

export function readingTime(post) {
  const words = (post.content || "").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = String(d.getDate()).padStart(2, "0");
  return `${month} ${day}, ${d.getFullYear()}`;
}

export function formatDateLong(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const month = d.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const day = String(d.getDate()).padStart(2, "0");
  return `${month} ${day}, ${d.getFullYear()}`;
}
