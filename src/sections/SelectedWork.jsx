import { Link } from "react-router";
import { portfolio } from "../data/portfolio.js";
import { withBase } from "../lib/base.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

function StatusBadge({ status }) {
  const inProgress = status === "in-progress";
  return (
    <span
      className={`label-mono text-[0.6rem] px-2.5 py-1 rounded-full border ${
        inProgress
          ? "border-accent bg-accent/10 text-goldtext"
          : "border-emerald/40 bg-emerald/10 text-emerald"
      }`}
    >
      {inProgress ? "● In progress" : "✓ Shipped"}
    </span>
  );
}

function GalleryCard({ item, index }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="group relative rounded-2xl border border-border bg-card overflow-hidden module-shift transition-all duration-300 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]">
      <Link to={item.caseStudy} className="block">
        <div className="relative aspect-video overflow-hidden bg-base">
          {item.image && (
            <img
              src={withBase(item.image)}
              alt={`${item.title} — preview`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/35 transition-colors duration-300 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-ink text-paper label-mono text-[0.65rem] font-medium px-4 py-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              View case study →
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="label-mono text-muted text-[0.6rem] tracking-[0.15em]">
              {num}
            </span>
            <StatusBadge status={item.status} />
          </div>

          <h3 className="head-display text-lg sm:text-xl text-ink leading-snug group-hover:text-goldtext transition-colors">
            {item.title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="label-mono text-[0.6rem] px-2 py-1 rounded-full border border-border-strong text-soft">
              {item.tag}
            </span>
            <span className="label-mono text-muted text-[0.55rem]">
              {item.type}
            </span>
          </div>
        </div>
      </Link>

      {item.github && (
        <a
          href={item.github}
          target="_blank"
          rel="noreferrer"
          className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-base/90 backdrop-blur border border-border px-2.5 py-1 label-mono text-[0.55rem] text-soft hover:text-ink transition-colors"
        >
          GitHub ↗
        </a>
      )}
    </div>
  );
}

export default function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-24 pt-32">
      <SectionHeading
        kicker="Projects"
        number="02"
        title="Projects."
        description="A short gallery of work I frame, build, and ship — hover to peek, click any card for the full case study."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {portfolio.map((item, idx) => (
          <Reveal key={item.id} delay={Math.min(idx * 60, 180)}>
            <GalleryCard item={item} index={idx} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
