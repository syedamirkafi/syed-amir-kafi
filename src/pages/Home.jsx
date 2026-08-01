import { useEffect, useState } from "react";
import { Link } from "react-router";
import { profile } from "../data/profile.js";
import { portfolio } from "../data/portfolio.js";
import { getAllPosts } from "../lib/posts.js";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
import PostCard from "../components/PostCard.jsx";
import SkillGrid from "../components/SkillGrid.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import HeroRoles from "../components/HeroRoles.jsx";
import Reveal from "../components/Reveal.jsx";
import { withBase } from "../lib/base.js";

const ROLE_COLORS = {
  RESEARCHER: "#0077B6",
  ANALYST: "#2563EB",
  DESIGNER: "#dc2626",
};

export default function Home() {
  useDocumentTitle(null);
  const posts = getAllPosts().slice(0, 4);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const activeRole = profile.roles[roleIndex];
  const activeColor = ROLE_COLORS[activeRole] || "#f4b400";

  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-[1600px] mx-auto">
        {/* HERO */}
        <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-0 border-2 border-ink mt-6 min-h-[62vh] backdrop-blur-sm relative">
          <div
            className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center border-b-2 md:border-b-0 md:border-r-2 border-ink transition-colors duration-700 relative overflow-hidden grid-bg"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-vital) 9%, var(--color-base))" }}
          >
            <div
              className="pastel-blob absolute -top-24 -right-24 w-72 h-72 transition-colors duration-700"
              style={{ backgroundColor: activeColor, animation: "orb-drift 6s ease-in-out infinite" }}
            />
            <span
              className="label-mono mb-6 transition-colors duration-700 relative"
              style={{ color: activeColor }}
            >
              {profile.mode}
            </span>
            <h1 className="head-display text-5xl sm:text-7xl lg:text-8xl leading-[0.85] relative">
              {profile.headline}
            </h1>
            <p className="mt-6 text-sm sm:text-base text-ink/70 max-w-md leading-relaxed relative">
              {profile.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 relative">
              <Link
                to="/projects"
                className="px-6 py-3 bg-vital text-base label-mono font-semibold hover:bg-ink transition-colors"
              >
                ENTER THE PROJECTS ›
              </Link>
              <Link
                to="/wins"
                className="px-6 py-3 border-2 border-ink label-mono font-semibold hover:bg-ink hover:text-base transition-colors"
              >
                VIEW THE WINS
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col bg-ink text-base relative">
            <HeroRoles active={activeRole} onSelect={setRoleIndex} />
          </div>
        </section>

        {/* THE WINS */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between mb-8 border-b border-ink/30 pb-4">
            <h2 className="head-display text-3xl sm:text-4xl">The Wins</h2>
            <Link
              to="/wins"
              className="label-mono text-ink/60 hover:text-vital transition-colors"
            >
              ALL WINS →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-2 border-ink divide-x divide-y sm:divide-y-0 divide-ink/20">
            {posts.slice(0, 5).map((p, i) => {
              const stat = p.stats && p.stats[0];
              return (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="p-6 flex flex-col justify-between min-h-[140px] glass-card hover:bg-ink hover:text-base transition-colors group"
                >
                  <span className="label-mono text-ink/40 text-[0.6rem] group-hover:text-base/50">
                    ● RECORDED {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="head-display text-4xl sm:text-5xl">
                      {stat ? stat.value : p.title}
                    </div>
                    <div className="label-mono text-ink/60 text-[0.6rem] mt-2 leading-relaxed group-hover:text-base/70">
                      {stat ? stat.label : "READ THE FIELD LOG"}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-8">
            <span className="red-square" />
          </div>
        </section>

        {/* INTELLECTUAL ARCHIVE */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between mb-8 border-b border-ink/30 pb-4">
            <h2 className="head-display text-3xl sm:text-4xl">
              Intellectual Archive
            </h2>
            <Link
              to="/projects"
              className="label-mono text-ink/60 hover:text-vital transition-colors"
            >
              ALL POSTS →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-8">
            <span className="red-square" />
          </div>
        </section>

        {/* TOOLBOX */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between mb-8 border-b border-ink/30 pb-4">
            <h2 className="head-display text-3xl sm:text-4xl">Toolbox</h2>
            <span className="label-mono text-ink/50">HONEST LEVELS</span>
          </div>
          <SkillGrid compact />
          <div className="mt-8">
            <span className="red-square" />
          </div>
        </section>

        {/* POLYMATH GALLERY */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between mb-8 border-b border-ink/30 pb-4">
            <h2 className="head-display text-3xl sm:text-4xl">
              Polymath Gallery
            </h2>
            <Link
              to="/projects"
              className="label-mono text-ink/60 hover:text-vital transition-colors"
            >
              ALL WORK →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolio.slice(0, 3).map((item) => (
              <a
                key={item.id}
                href={withBase(item.href)}
                target={item.href.startsWith("/") ? undefined : "_blank"}
                rel="noreferrer"
                className="module-shift block border-2 border-ink bg-base group"
              >
                <div className="relative w-full h-56 overflow-hidden border-b-2 border-ink">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="head-display text-base text-4xl opacity-90 px-6 text-center">
                      {item.title}
                    </span>
                  </div>
                  <span
                    className="absolute top-0 left-0 px-2 py-1 label-mono text-base"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.tag}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="head-display text-xl">{item.title}</h3>
                  <p className="text-sm text-ink/70 leading-relaxed line-clamp-2">
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
            ))}
          </div>
        </section>

        {/* THE AUTHOR */}
        <section className="mt-16 mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 border-2 border-ink">
          <div className="md:col-span-5 bg-ink text-base p-8 flex flex-col justify-center">
            <span className="label-mono opacity-60 mb-4">/// PROFILE 01</span>
            <h2 className="head-display text-4xl">The Author</h2>
          </div>
          <div className="md:col-span-7 p-8 flex flex-col justify-center">
            {profile.bio.map((paragraph, i) => (
              <p
                key={i}
                className="text-base sm:text-lg text-ink/80 leading-relaxed max-w-prose"
              >
                {paragraph}
              </p>
            ))}
            <Link
              to="/about"
              className="mt-6 label-mono text-vital font-semibold"
            >
              READ THE FULL CHRONICLE →
            </Link>
          </div>
        </section>

        {/* CONTACT */}
        <section className="mb-16">
          <ContactCTA />
        </section>
      </div>
    </main>
  );
}
