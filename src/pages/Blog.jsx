import { useMemo, useState } from "react";
import { getAllPosts } from "../lib/posts.js";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
import PostCard from "../components/PostCard.jsx";
import CareerSection from "../sections/CareerSection.jsx";
import AcademiaSection from "../sections/AcademiaSection.jsx";
import TechSection from "../sections/TechSection.jsx";
import PhotoSection from "../sections/PhotoSection.jsx";
import StoriesSection from "../sections/StoriesSection.jsx";

const tabs = [
  { id: "all", label: "ALL", n: "00" },
  { id: "career", label: "CAREER", n: "01" },
  { id: "academia", label: "ACADEMIA", n: "02" },
  { id: "tech", label: "TECH", n: "03" },
  { id: "photo", label: "PHOTO", n: "04" },
  { id: "stories", label: "STORIES", n: "05" },
];

export default function Blog() {
  useDocumentTitle("The Blog");
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState(null);

  const posts = getAllPosts();
  const allTags = useMemo(
    () => [...new Set(posts.flatMap((p) => p.tags))].sort(),
    [posts]
  );

  const filtered = useMemo(() => {
    let out = active === "all" ? posts : posts.filter((p) => p.section === active);
    if (tag) out = out.filter((p) => p.tags.includes(tag));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return out;
  }, [posts, active, query, tag]);

  const sections = {
    career: <CareerSection posts={filtered} />,
    academia: <AcademiaSection posts={filtered} />,
    tech: <TechSection posts={filtered} />,
    photo: <PhotoSection />,
    stories: <StoriesSection posts={filtered} />,
  };

  const empty = filtered.length === 0 && active !== "photo";

  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pt-8">
        <header className="border-b-2 border-ink pb-6 mb-8">
          <span className="label-mono text-ink/50">/// 02 — ARCHIVE</span>
          <h1 className="head-display text-5xl sm:text-7xl mt-2">The Blog</h1>
          <p className="text-sm text-ink/60 mt-3 max-w-xl">
            Case studies, research notes, tools, photos, and stories — five
            sections, each with its own interface.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActive(tab.id);
                setTag(null);
                setQuery("");
              }}
              className={`px-4 py-2 label-mono font-semibold border-2 transition-colors ${
                active === tab.id
                  ? "bg-ink text-base border-ink"
                  : "border-ink/30 hover:border-ink"
              }`}
            >
              <span className="opacity-50">{tab.n}·</span> {tab.label}
            </button>
          ))}
        </div>

        {active === "all" && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH THE ARCHIVE…"
                className="w-full border-2 border-ink px-4 py-3 label-mono text-sm bg-base focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-vital)]"
                aria-label="Search posts"
              />
            </div>
            <div className="md:col-span-8 flex flex-wrap gap-1 content-start">
              {allTags.slice(0, 24).map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(tag === t ? null : t)}
                  className={`tag-chip hover:border-ink transition-colors ${
                    tag === t ? "!border-ink !bg-ink !text-base" : ""
                  }`}
                >
                  #{t}
                </button>
              ))}
            </div>
          </div>
        )}

        {empty ? (
          <p className="label-mono text-ink/40 py-16 text-center">
            NO ENTRIES MATCH THAT SEARCH.
          </p>
        ) : (
          <div>
            {active === "all" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              sections[active]
            )}
          </div>
        )}

        <div className="mt-16">
          <span className="red-square" />
        </div>
      </div>
    </main>
  );
}
