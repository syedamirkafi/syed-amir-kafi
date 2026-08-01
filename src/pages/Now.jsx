import { profile } from "../data/profile.js";
import ContactCTA from "../components/ContactCTA.jsx";

const now = [
  {
    label: "WORK",
    color: "#0077B6",
    items: [
      "Working student in Operations & Process Support at Picnic Technologies (Hamm).",
      "Open to working-student and entry-level Data Analyst / BI / Business Analyst / Operations roles — remote-first in Germany.",
    ],
  },
  {
    label: "STUDY",
    color: "#F4B400",
    items: [
      "M.A. International Management & Information Systems — 4th semester at FH Südwestfalen, Soest.",
      "Thesis planning in the fall, focused on data-driven operational decision-making.",
    ],
  },
  {
    label: "LEARNING",
    color: "#D90429",
    items: [
      "Google Data Analytics certificate — in progress.",
      "Microsoft Power BI certification — planned.",
      "IIBA ECBA (business analysis) — planned.",
    ],
  },
  {
    label: "LANGUAGE",
    color: "#121212",
    items: [
      "German A2 → targeting B1 by December 2026.",
      "Documenting the journey in the Deutsch section of this blog.",
    ],
  },
  {
    label: "BUILDING",
    color: "#0077B6",
    items: [
      "Pivot — AI career operations platform (github.com/syedamirkafi/pivot).",
      "This site — a markdown-powered, zero-database personal archive.",
      "Portfolio case studies: HR analytics, operations optimization, and BA process mapping.",
    ],
  },
];

export default function Now() {
  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pt-8">
        <header className="border-b-2 border-ink pb-6 mb-10">
          <span className="label-mono text-ink/50">/// 05 — STATUS</span>
          <h1 className="head-display text-5xl sm:text-7xl mt-2">Now</h1>
          <p className="text-sm text-ink/60 mt-3 max-w-xl">
            What I'm working on, learning, and looking for — a living page,
            updated as things change. Last updated August 2026.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {now.map((block) => (
            <div key={block.label} className="border-2 border-ink">
              <div
                className="flex items-center justify-between px-5 py-3 border-b-2 border-ink"
                style={{ backgroundColor: block.color }}
              >
                <span className="label-mono font-semibold text-base">
                  {block.label}
                </span>
                <span className="label-mono text-base opacity-70">
                  ● ACTIVE
                </span>
              </div>
              <ul className="p-6 space-y-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink/80 leading-relaxed">
                    <span className="label-mono text-ink/30 shrink-0">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
              {profile.location}
            </span>
          </div>
          <ContactCTA />
        </section>
      </div>
    </main>
  );
}
