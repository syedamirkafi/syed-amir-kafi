import { timeline } from "../data/timeline.js";
import { workSamples } from "../data/workSamples.js";
import { withBase } from "../lib/base.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function WorkSamplePreview({ sampleId }) {
  const sample = workSamples.find((s) => s.id === sampleId);
  if (!sample) return null;

  return (
    <a
      href={withBase(sample.link)}
      className="group flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border bg-base/50 hover:bg-base hover:border-accent transition-all"
      aria-label={`View ${sample.title}`}
    >
      <div className="w-10 h-10 shrink-0 rounded-lg border border-border-strong bg-card flex items-center justify-center">
        {sample.type === "Dashboard" && (
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )}
        {sample.type === "Process map" && (
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        )}
        {sample.type === "Stock table" && (
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
        {sample.type === "Brief framework" && (
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
        {sample.type === "Process docs" && (
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="label-mono text-accent text-[0.55rem] tracking-wider">{sample.type}</p>
        <p className="serif text-sm text-ink font-medium truncate">{sample.title}</p>
        <p className="text-[0.7rem] text-muted truncate">{sample.context}</p>
      </div>
      <svg className="w-4 h-4 text-muted group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="scroll-mt-24 pt-32">
      <SectionHeading
        kicker="Experience"
        number="01"
        title="Where I've worked."
        description="Five roles across operations, sales analytics, research, and banking — each one taught me how work actually gets done."
      />

      <div className="relative">
        <div className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-border-strong hidden sm:block" />
        <div className="space-y-6">
          {timeline.map((job, idx) => (
            <Reveal key={job.org} delay={Math.min(idx * 60, 240)}>
              <div className="sm:pl-14 relative">
                <div className="absolute left-0 top-7 hidden sm:flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-card">
                  <span className="mono text-soft text-[0.65rem]">
                    {initials(job.org)}
                  </span>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 module-shift">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="serif text-ink font-medium text-lg leading-snug">
                      {job.role}
                    </h3>
                    <span className="mono text-muted text-[0.65rem]">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-ink/70 text-sm mb-4">
                    · {job.org}
                    <span className="text-muted"> · {job.location}</span>
                  </p>

                  <ul className="space-y-2 mb-5">
                    {job.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-soft text-sm leading-relaxed"
                      >
                        <span className="text-muted shrink-0 mt-0.5">▪</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 mb-5">
                    <span className="label-mono text-goldtext text-[0.6rem] block mb-1">
                      Impact
                    </span>
                    <p className="text-goldtext text-sm leading-relaxed">
                      {job.impact}
                    </p>
                  </div>

                  {job.workSamples && job.workSamples.length > 0 && (
                    <div className="mb-5">
                      <span className="label-mono text-muted text-[0.6rem] block mb-3">
                        Work samples
                      </span>
                      <div className="flex flex-col gap-2">
                        {job.workSamples.map((sampleId) => (
                          <WorkSamplePreview key={sampleId} sampleId={sampleId} />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {job.transferableSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border bg-base px-3 py-1 text-soft text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}