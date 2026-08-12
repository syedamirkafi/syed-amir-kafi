import { portfolio } from "../data/portfolio.js";
import { SHOWCASES } from "../components/ProjectShowcases.jsx";
import { withBase } from "../lib/base.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

function Field({ label, children, accent = "text-soft" }) {
  return (
    <div>
      <span className="label-mono text-muted text-[0.6rem] block mb-2">
        {label}
      </span>
      <div className={`text-sm leading-relaxed ${accent}`}>{children}</div>
    </div>
  );
}

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

function ProjectLink({ item }) {
  if (item.github) {
    return (
      <a
        href={item.github}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-block label-mono text-sm font-semibold text-ink hover:text-goldtext transition-colors"
      >
        View on GitHub ↗
      </a>
    );
  }
  if (item.caseStudy) {
    return (
      <a
        href={withBase(item.caseStudy)}
        className="mt-6 inline-block label-mono text-sm font-semibold text-ink hover:text-goldtext transition-colors"
      >
        Read case study →
      </a>
    );
  }
  return null;
}

function WorkCard({ item, Showcase }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden module-shift">
      {Showcase && <Showcase item={item} />}
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <StatusBadge status={item.status} />
          <span
            className="label-mono text-[0.6rem] px-2 py-1 text-base rounded-full border border-border-strong"
          >
            {item.tag}
          </span>
        </div>

        <h3 className="head-display text-xl sm:text-2xl text-ink mb-3">
          {item.title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Field label="Problem">{item.problem}</Field>
          <Field label="Solution">{item.solution}</Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Field label="Role">
            <span className="inline-block rounded-full border border-border-strong bg-base px-3 py-1 text-xs text-ink">
              {item.role}
            </span>
          </Field>
          <Field label="Impact" accent="text-goldtext">
            {item.impact}
          </Field>
        </div>

        <div className="mb-6">
          <span className="label-mono text-muted text-[0.6rem] block mb-2">
            Methods & tools
          </span>
          <div className="flex flex-wrap gap-2">
            {item.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-base px-3 py-1 text-soft text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <span className="label-mono text-muted text-[0.6rem] block mb-2">
            What I learned
          </span>
          <p className="text-soft text-sm leading-relaxed serif italic">
            {item.lessons}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
          {item.caseStudy && (
            <a
              href={withBase(item.caseStudy)}
              className="inline-flex items-center gap-2 rounded-full bg-ink hover:bg-ink/85 text-base text-xs font-medium px-4 py-2 transition-colors"
            >
              Case study →
            </a>
          )}
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong hover:border-ink hover:text-ink text-soft text-xs font-medium px-4 py-2 transition-colors"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
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
        description="Four pieces that show how I frame problems, design solutions, and deliver artifacts teams actually use."
      />

      <div className="space-y-10">
        {portfolio.map((item, idx) => (
          <Reveal key={item.id} delay={Math.min(idx * 40, 160)}>
            <WorkCard
              item={item}
              Showcase={SHOWCASES[item.id] || null}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}