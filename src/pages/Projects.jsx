import { useMemo, useState } from "react";
import { portfolio } from "../data/portfolio.js";
import { getAllPosts } from "../lib/posts.js";
import { withBase } from "../lib/base.js";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
import ContactCTA from "../components/ContactCTA.jsx";
import CareerSection from "../sections/CareerSection.jsx";
import AcademiaSection from "../sections/AcademiaSection.jsx";
import TechSection from "../sections/TechSection.jsx";
import PhotoSection from "../sections/PhotoSection.jsx";
import StoriesSection from "../sections/StoriesSection.jsx";

function StatusBadge({ status }) {
  const inProgress = status === "in-progress";
  return (
    <span
      className={`label-mono text-[0.6rem] px-2 py-1 border ${
        inProgress
          ? "border-vital text-ink bg-vital/20"
          : "border-ink/40 text-ink/60"
      }`}
    >
      {inProgress ? "● IN PROGRESS" : "✓ SHIPPED"}
    </span>
  );
}

function PortfolioCard({ item }) {
  return (
    <a
      key={item.id}
      href={withBase(item.href)}
      target={item.href.startsWith("/") ? undefined : "_blank"}
      rel="noreferrer"
      className="module-shift block border-2 border-ink bg-base group"
    >
      <div
        className="relative w-full h-52 overflow-hidden border-b-2 border-ink"
        style={{ backgroundColor: item.color }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `var(--color-${item.pastel})` }}
        />
        <span className="head-display text-base text-3xl sm:text-4xl opacity-90 px-6 text-center relative z-10 mix-blend-multiply">
          {item.title}
        </span>
        <span
          className="absolute top-0 left-0 px-2 py-1 label-mono text-base relative z-10"
          style={{ backgroundColor: item.color }}
        >
          {item.tag}
        </span>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <StatusBadge status={item.status} />
        </div>
        <h3 className="head-display text-xl">{item.title}</h3>
        <p className="text-sm text-ink/70 leading-relaxed line-clamp-3">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1 pt-1">
          {item.tags.map((tag) => (
            <span key={tag} className="tag-chip">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

function SectionHeader({ index, title, note }) {
  return (
    <div className="flex items-baseline justify-between mb-8 border-b border-ink/30 pb-4">
      <h2 className="head-display text-3xl sm:text-4xl">
        <span className="label-mono text-vital text-base mr-3 align-middle">
          {index}
        </span>
        {title}
      </h2>
      <span className="label-mono text-ink/50 hidden sm:block">{note}</span>
    </div>
  );
}

export default function Projects() {
  useDocumentTitle("The Projects");
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState(null);

  const posts = getAllPosts();
  const allTags = useMemo(
    () => [...new Set(posts.flatMap((p) => p.tags))].sort(),
    [posts]
  );

  const filtered = useMemo(() => {
    let out = posts;
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
  }, [posts, query, tag]);

  const inProgress = portfolio.filter((p) => p.status === "in-progress");
  const shipped = portfolio.filter((p) => p.status === "shipped");
  const career = filtered.filter((p) => p.section === "career");
  const academia = filtered.filter((p) => p.section === "academia");
  const tech = filtered.filter((p) => p.section === "tech");
  const stories = filtered.filter((p) => p.section === "stories");

  const empty = filtered.length === 0 && query.trim();

  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pt-8">
        <header className="border-b-2 border-ink pb-6 mb-10">
          <span className="label-mono text-ink/50">/// 02 — OUTPUTS</span>
          <h1 className="head-display text-5xl sm:text-7xl mt-2">
            The Projects
          </h1>
          <p className="text-sm text-ink/60 mt-3 max-w-xl">
            What I'm building now and what I've shipped — case studies, tools,
            research, and the experiments behind the numbers.
          </p>
        </header>

        <div className="mb-10 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH THE ARCHIVE…"
              className="w-full border-2 border-ink px-4 py-3 label-mono text-sm bg-base focus:outline-none focus:shadow-[4px_4px_0_0_var(--color-vital)]"
              aria-label="Search projects"
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

        {empty ? (
          <p className="label-mono text-ink/40 py-16 text-center">
            NO ENTRIES MATCH THAT SEARCH.
          </p>
        ) : (
          <div className="space-y-20">
            <section>
              <SectionHeader index="01" title="In Progress" note="ACTIVE BUILDS" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgress.map((item) => (
                  <PortfolioCard key={item.id} item={item} />
                ))}
              </div>
              {tech.filter((p) => p.status === "in-progress").length > 0 && (
                <div className="mt-10">
                  <TechSection
                    posts={tech.filter((p) => p.status === "in-progress")}
                  />
                </div>
              )}
            </section>

            <section>
              <SectionHeader index="02" title="Shipped" note="RECORDED OUTCOMES" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {shipped.map((item) => (
                  <PortfolioCard key={item.id} item={item} />
                ))}
              </div>
            </section>

            <section>
              <SectionHeader index="03" title="Field Logs" note="CAREER CASE STUDIES" />
              <CareerSection posts={career} />
            </section>

            <section>
              <SectionHeader index="04" title="Research" note="FIELD: RESEARCH PRACTICE" />
              <AcademiaSection posts={academia} />
            </section>

            <section>
              <SectionHeader index="05" title="Tools & Experiments" note="BUILT WITH CODE" />
              <TechSection
                posts={tech.filter((p) => p.status !== "in-progress")}
              />
            </section>

            <section>
              <SectionHeader index="06" title="Stories" note="PERSONAL NOTES" />
              <StoriesSection posts={stories} />
            </section>

            <section>
              <SectionHeader index="07" title="Photo Log" note="FROM THE FIELD" />
              <PhotoSection />
            </section>

            <div>
              <span className="red-square" />
            </div>
          </div>
        )}

        <div className="mt-16 mb-4">
          <ContactCTA compact />
        </div>
      </div>
    </main>
  );
}
