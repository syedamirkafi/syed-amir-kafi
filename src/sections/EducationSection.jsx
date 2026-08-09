import { education } from "../data/timeline.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

function isHRChip(c) {
  return c === "HR Analytics" || c === "Organizational Behavior";
}

export default function EducationSection() {
  return (
    <section id="education" className="scroll-mt-24 pt-32">
      <SectionHeading
        kicker="Education"
        number="06"
        title="Where I studied."
        description="Started in business administration, detoured through an MBA in HR, and landed on information systems — the people side and the systems side of change."
      />

      <div className="space-y-5">
        {education.map((edu, idx) => (
          <Reveal key={edu.degree} delay={Math.min(idx * 60, 180)}>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 module-shift">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="serif text-ink font-medium text-lg leading-snug">
                  {edu.degree}
                </h3>
                <span className="mono text-muted text-[0.65rem]">
                  {edu.period}
                </span>
              </div>
              <p className="text-ink/70 text-sm mb-4">
                · {edu.org}
                <span className="text-muted"> · {edu.note}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((c) => (
                  <span
                    key={c}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      isHRChip(c)
                        ? "border-accent bg-accent/15 text-goldtext"
                        : "border-border bg-base text-soft"
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
