import { useState } from "react";
import { getAllPosts, getCategories } from "../lib/posts.js";
import PostCard from "../components/PostCard.jsx";

export default function Blog() {
  const [active, setActive] = useState("ALL");
  const posts = getAllPosts();
  const categories = ["ALL", ...getCategories()];
  const filtered =
    active === "ALL" ? posts : posts.filter((p) => p.category === active);

  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pt-8">
        <header className="border-b-2 border-ink pb-6 mb-8">
          <span className="label-mono text-ink/50">/// 02 — ARCHIVE</span>
          <h1 className="head-display text-5xl sm:text-7xl mt-2">The Blog</h1>
          <p className="text-sm text-ink/60 mt-3 max-w-xl">
            Case studies, method notes, and field reports from data analytics,
            business analysis, operations, and the tools I build.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 label-mono font-semibold border-2 transition-colors ${
                active === cat
                  ? "bg-ink text-base border-ink"
                  : "border-ink/30 hover:border-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="label-mono text-ink/40 py-16 text-center">
            NO ENTRIES IN THIS CATEGORY YET.
          </p>
        )}

        <div className="mt-16">
          <span className="red-square" />
        </div>
      </div>
    </main>
  );
}
