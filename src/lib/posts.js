import matter from "gray-matter";

const modules = import.meta.glob("/content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function slugFromPath(path) {
  const file = path.split("/").pop().replace(".md", "");
  return file;
}

export function getAllPosts() {
  const posts = Object.entries(modules).map(([path, raw]) => {
    const { data, content } = matter(raw);
    return {
      slug: slugFromPath(path),
      title: data.title || slugFromPath(path),
      date: data.date || "2026-01-01",
      category: data.category || "NOTE",
      tags: data.tags || [],
      excerpt: data.excerpt || "",
      cover: data.cover || "#121212",
      featured: Boolean(data.featured),
      order: data.order || 99,
      content,
    };
  });

  return posts.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return new Date(b.date) - new Date(a.date);
  });
}

export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug) || null;
}

export function getCategories() {
  return [...new Set(getAllPosts().map((p) => p.category))];
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
