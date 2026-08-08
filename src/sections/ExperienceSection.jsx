import { timeline } from "../data/timeline.js";
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

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 pt-32">
      <SectionHeading
        kicker="Experience"
        number="02"
        title="Work that built the transferable skills."
        description="Every role below contributed something a business analysis team needs — data, process discipline, and clear communication. Read in sequence, it traces the path from field operations to requirements."
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
                    <span className="label-mono text-accent-ink text-[0.6rem] block mb-1">
                      Impact
                    </span>
                    <p className="text-accent-ink text-sm leading-relaxed">
                      {job.impact}
                    </p>
                  </div>

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
