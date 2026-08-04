import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { profile } from "../data/profile.js";
import { portfolio } from "../data/portfolio.js";
import { getAllPosts } from "../lib/posts.js";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
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
  const [hovering, setHovering] = useState(false);
  const hoveringRef = useRef(false);
  hoveringRef.current = hovering;

  useEffect(() => {
    const id = setInterval(() => {
      if (!hoveringRef.current) {
        setRoleIndex((i) => (i + 1) % profile.roles.length);
      }
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const activeRole = profile.roles[roleIndex];
  const activeColor = ROLE_COLORS[activeRole] || "#f4b400";

  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-[1600px] mx-auto">
        {/* HERO */}
        <Reveal className="mt-6 min-h-[62vh] flex flex-col justify-center relative">
          <div
            className="pastel-blob hero-blob absolute top-0 right-0 w-96 h-96 -z-10 transition-colors duration-700"
            style={{ backgroundColor: activeColor }}
          />
          <h1
            className="head-display text-5xl sm:text-7xl lg:text-8xl leading-[0.85] relative mb-4 transition-all duration-700"
            style={{ color: activeColor }}
          >
            {profile.headline}
          </h1>
          <p className="text-sm sm:text-base text-ink/70 max-w-2xl leading-relaxed mb-6 relative">
            {profile.tagline}
          </p>
          <div
            className="relative"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <HeroRoles active={activeRole} onSelect={setRoleIndex} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="px-6 py-3 bg-vital text-base label-mono font-semibold hover:bg-ink transition-all duration-300"
            >
              ENTER THE PROJECTS ›
            </Link>
            <Link
              to="/wins"
              className="px-6 py-3 border border-ink label-mono font-semibold hover:bg-ink/5 transition-all duration-300"
            >
              VIEW THE WINS
            </Link>
          </div>
        </Reveal>

        {/* THE WINS */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between mb-6 pb-2">
            <h2 className="head-display section-title text-3xl sm:text-4xl">The Wins</h2>
            <Link
              to="/wins"
              className="label-mono text-ink/60 hover:text-vital transition-colors"
            >
              ALL WINS →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5">
            {posts.slice(0, 3).map((p, i) => {
              const stat = p.stats && p.stats[0];
              return (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group p-6 flex flex-col justify-between min-h-[140px] bg-ink/3 hover:bg-ink/5 transition-all duration-300"
                >
                  <div className="head-display text-4xl sm:text-5xl group-hover:opacity-80 transition-opacity">
                    {stat ? stat.value : p.title}
                  </div>
                  <div className="label-mono text-ink/50 text-xs mt-2">
                    {stat ? stat.label : "READ THE FIELD LOG"}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* TOOLBOX */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between mb-6 pb-2">
            <h2 className="head-display section-title text-3xl sm:text-4xl">Toolbox</h2>
            <span className="label-mono text-ink/50">HONEST LEVELS</span>
          </div>
          <SkillGrid compact />
        </section>

        {/* POLYMATH GALLERY */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between mb-6 pb-2">
            <h2 className="head-display section-title text-3xl sm:text-4xl">Polymath Gallery</h2>
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
                className="group block bg-base transition-all duration-300"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="head-display text-base text-3xl sm:text-4xl opacity-90 px-6 text-center group-hover:opacity-100 transition-opacity">
                      {item.title}
                    </span>
                  </div>
                  <span
                    className="absolute top-0 left-0 px-2 py-1 label-mono text-xs"
                    style={{ backgroundColor: item.color, color: "var(--color-base)" }}
                  >
                    {item.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="head-display text-xl mb-2">{item.title}</h3>
                  <p className="text-sm text-ink/70 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* THE AUTHOR */}
        <section className="mt-16 mb-16">
          <div className="md:grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5 bg-ink text-base p-8 mb-8 md:mb-0">
              <span className="label-mono opacity-50 mb-4 block">/// ABOUT ME</span>
              <h2 className="head-display text-4xl">Hello. This is me — Amer</h2>
            </div>
            <div className="md:col-span-7 p-8">
              {profile.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg text-ink/80 leading-relaxed max-w-prose mb-4"
                >
                  {paragraph}
                </p>
              ))}
              <Link
                to="/about"
                className="mt-4 label-mono text-vital font-semibold"
              >
                READ THE FULL CHRONICLE →
              </Link>
            </div>
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
