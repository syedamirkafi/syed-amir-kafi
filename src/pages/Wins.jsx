import { Link } from "react-router";
import { wins } from "../data/wins.js";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
import ContactCTA from "../components/ContactCTA.jsx";

export default function Wins() {
  useDocumentTitle("The Wins");
  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pt-8">
        <header className="border-b-2 border-ink pb-6 mb-10">
          <span className="label-mono text-ink/50">/// 03 — RECORDED OUTCOMES</span>
          <h1 className="head-display text-5xl sm:text-7xl mt-2">The Wins</h1>
          <p className="text-sm text-ink/60 mt-3 max-w-xl">
            Measured outcomes with the story behind each number — what was done,
            at what scale, and what changed.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wins.map((w) => (
            <div
              key={w.label}
              className="module-shift relative border-2 border-ink bg-base p-6 sm:p-8 overflow-hidden"
            >
              <div
                className="pastel-blob absolute -top-16 -right-16 w-56 h-56"
                style={{ backgroundColor: `var(--color-${w.pastel})` }}
              />
              <div className="relative">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="label-mono text-ink/40 text-[0.6rem]">
                    ● RECORDED · {w.year}
                  </span>
                  <span className="label-mono text-ink/40 text-[0.6rem]">
                    PROOF ON FILE
                  </span>
                </div>
                <div
                  className="head-display text-5xl sm:text-6xl"
                  style={{ color: w.accent }}
                >
                  {w.value}
                </div>
                <div className="label-mono text-ink/60 text-xs mt-2">
                  {w.label}
                </div>
                <p className="text-sm text-ink/70 leading-relaxed mt-4">
                  {w.story}
                </p>
                <Link
                  to={w.source}
                  className="mt-5 inline-block label-mono text-xs font-semibold text-vital hover:text-ink transition-colors"
                >
                  READ THE FIELD REPORT →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 mb-4">
          <span className="red-square" />
        </div>

        <section className="mt-12 mb-16">
          <div className="flex items-baseline justify-between mb-8 border-b border-ink/30 pb-4">
            <h2 className="head-display text-3xl sm:text-4xl">Hiring?</h2>
            <span className="label-mono text-ink/50">
              TALK DATA, OPERATIONS, DECISIONS
            </span>
          </div>
          <ContactCTA />
        </section>
      </div>
    </main>
  );
}
