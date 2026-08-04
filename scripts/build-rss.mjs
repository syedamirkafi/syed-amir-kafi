import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import matter from "gray-matter";

const ROOT = join(import.meta.dirname, "..");
const POSTS_DIR = join(ROOT, "content", "posts");
const DIST_DIR = join(ROOT, "dist");
const SITE_URL = "https://syedamirkafi.github.io/the-monolith";

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildRss() {
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const raw = readFileSync(join(POSTS_DIR, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(".md", ""),
      title: data.title || file.replace(".md", ""),
      date: data.date || "2026-01-01",
      excerpt: data.excerpt || "",
      category: data.category || "NOTE",
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const items = posts
    .map((p) => {
      const link = `${SITE_URL}/blog/${p.slug}`;
      const iso = new Date(p.date).toUTCString();
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${iso}</pubDate>
      <category>${escapeXml(p.category)}</category>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>THE MONOLITH — Syed Amir Kafi</title>
    <link>${SITE_URL}</link>
    <description>Data analytics, business analysis, operations, and design — field logs from Syed Amir Kafi.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  mkdirSync(DIST_DIR, { recursive: true });
  writeFileSync(join(DIST_DIR, "rss.xml"), xml, "utf-8");
  console.log(`Built dist/rss.xml with ${posts.length} posts`);
}

buildRss();
