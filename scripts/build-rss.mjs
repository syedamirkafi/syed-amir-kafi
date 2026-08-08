import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const ROOT = join(import.meta.dirname, "..");
const POSTS_DIR = join(ROOT, "content", "posts");
const DIST_DIR = join(ROOT, "dist");
const SITE_URL = "https://syedamirkafi.github.io/syed-amir-kafi";

const AMP = "\u0026amp;";
const LT = "\u0026lt;";
const GT = "\u0026gt;";
const QUOT = "\u0026quot;";
const APOS = "\u0026apos;";

function escapeXml(text) {
  return String(text)
    .replace(/&/g, AMP)
    .replace(/</g, LT)
    .replace(/>/g, GT)
    .replace(/"/g, QUOT)
    .replace(/'/g, APOS);
}

function buildRss() {
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files
    .map((file) => {
      const raw = readFileSync(join(POSTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(".md", ""),
        title: data.title || file.replace(".md", ""),
        date: data.date || "2026-01-01",
        excerpt: data.excerpt || "",
        category: data.category || "NOTE",
        draft: Boolean(data.draft),
      };
    })
    .filter((p) => !p.draft);

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const items = posts
    .map((p) => {
      const link = SITE_URL + "/blog/" + p.slug;
      const iso = new Date(p.date).toUTCString();
      return "    <item>\n      <title>" + escapeXml(p.title) + "</title>\n      <link>" + link + "</link>\n      <guid>" + link + "</guid>\n      <pubDate>" + iso + "</pubDate>\n      <category>" + escapeXml(p.category) + "</category>\n      <description>" + escapeXml(p.excerpt) + "</description>\n    </item>";
    })
    .join("\n");

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n' +
    "  <channel>\n" +
    "    <title>Syed Amir Kafi — Field notes</title>\n" +
    "    <link>" + SITE_URL + "</link>\n" +
    "    <description>Business analyst — field notes on requirements, dashboards, process work, and digital transformation.</description>\n" +
    "    <language>en</language>\n" +
    "    <lastBuildDate>" + new Date().toUTCString() + "</lastBuildDate>\n" +
    '    <atom:link href="' + SITE_URL + '/rss.xml" rel="self" type="application/rss+xml" />\n' +
    items + "\n" +
    "  </channel>\n" +
    "</rss>\n";

  mkdirSync(DIST_DIR, { recursive: true });
  writeFileSync(join(DIST_DIR, "rss.xml"), xml, "utf-8");
  console.log("Built dist/rss.xml with " + posts.length + " posts");
}

buildRss();
