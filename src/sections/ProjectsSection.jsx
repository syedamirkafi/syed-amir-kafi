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

function CaseCard({ item }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 module-shift">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Problem">{item.problem}</Field>
        <Field label="Solution">{item.solution}</Field>
        <Field label="Role">
          <span className="inline-block rounded-full border border-border-strong bg-base px-3 py-1 text-xs text-ink">
            {item.role}
          </span>
        </Field>
        <Field label="Impact" accent="text-accent-ink">
          {item.impact}
        </Field>
      </div>

      <div className="mt-6">
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

      <div className="mt-6">
        <span className="label-mono text-muted text-[0.6rem] block mb-2">
          What I learned
        </span>
        <p className="text-soft text-sm leading-relaxed serif italic">
          {item.lessons}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
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
        {item.live && (
          <a
            href={item.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong hover:border-ink hover:text-ink text-soft text-xs font-medium px-4 py-2 transition-colors"
          >
            Live demo ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const cases = portfolio.map((item) => ({
    item,
    Showcase: SHOWCASES[item.id] || null,
  }));

  return (
    <section id="projects" className="scroll-mt-24 pt-32">
      <SectionHeading
        kicker="Projects"
        number="03"
        title="Two case studies, end to end."
        description="Presented the way they actually happened: the business problem first, then the role, the methods, and what changed."
      />

      <div className="space-y-10">
        {cases.map(({ item, Showcase }, idx) => (
          <Reveal key={item.id} delay={Math.min(idx * 40, 160)}>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.cover }}
                />
                <h3 className="serif text-xl text-ink font-medium">
                  {item.title}
                </h3>
                <span className="mono text-muted text-[0.65rem] ml-auto">
                  {item.status === "shipped" ? "shipped" : "in progress"}
                </span>
              </div>
              {Showcase && <Showcase item={item} />}
              <CaseCard item={item} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
