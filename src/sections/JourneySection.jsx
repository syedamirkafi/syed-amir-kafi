import { timeline as workTimeline } from "../data/timeline.js";
import { education } from "../data/timeline.js";
import { workSamples } from "../data/workSamples.js";
import { withBase } from "../lib/base.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

const MONTHS = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function startKey(period) {
  const [month, year] = period.split("—")[0].trim().split(/\s+/);
  return parseInt(year, 10) * 12 + (MONTHS[month] ?? 0);
}

function isHRChip(c) {
  return c === "HR Analytics" || c === "Organizational Behavior";
}

function EducationCard({ data }) {
  return (
    <div className="rounded-2xl border border-border glass-card p-6 sm:p-7 module-shift">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <h4 className="serif text-ink font-medium text-lg leading-snug">{data.degree}</h4>
        <span className="mono text-muted text-[0.65rem] whitespace-nowrap">{data.period}</span>
      </div>
      <p className="text-ink/70 text-sm mb-4 flex items-center gap-1.5">
        <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{data.org}</span>
        <span className="text-muted">· {data.note}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {data.coursework.map((c) => (
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
  );
}

function WorkCard({ data }) {
  const sample =
    data.workSamples?.length > 0
      ? workSamples.find((s) => s.id === data.workSamples[0])
      : null;

  return (
    <div className="rounded-2xl border border-border glass-card p-6 sm:p-7 module-shift">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <h4 className="serif text-ink font-medium text-lg leading-snug">{data.role}</h4>
        <span className="mono text-muted text-[0.65rem] whitespace-nowrap">{data.period}</span>
      </div>
      <p className="text-ink/70 text-sm mb-4 flex items-center gap-1.5">
        <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <span>{data.org}</span>
        <span className="text-muted">· {data.location}</span>
      </p>
      <ul className="space-y-2 mb-4">
        {data.points.slice(0, 3).map((point, i) => (
          <li key={i} className="flex gap-2.5 text-soft text-sm leading-relaxed">
            <span className="text-muted shrink-0 mt-0.5">▪</span>
            <span>{point}</span>
          </li>
        ))}
        {data.points.length > 3 && (
          <li className="text-muted text-sm italic">+{data.points.length - 3} more</li>
        )}
      </ul>
      <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 mb-4">
        <span className="label-mono text-goldtext text-[0.6rem] block mb-1">Impact</span>
        <p className="text-goldtext text-sm leading-relaxed">{data.impact}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.transferableSkills.slice(0, 4).map((skill) => (
          <span key={skill} className="rounded-full border border-border bg-base px-3 py-1 text-soft text-xs">{skill}</span>
        ))}
        {data.transferableSkills.length > 4 && (
          <span className="rounded-full border border-border bg-base px-3 py-1 text-muted text-xs">+{data.transferableSkills.length - 4} more</span>
        )}
      </div>
      {sample && (
        <div className="mt-4 pt-4 border-t border-border">
          <a href={withBase(sample.link)} className="block group">
            {sample.image && (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-base">
                <img
                  src={withBase(sample.image)}
                  alt={`${sample.title} — work sample preview`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <span className="inline-flex items-center gap-1.5 label-mono text-[0.6rem] text-accent hover:text-ink transition-colors mt-2.5">
              View work sample →
            </span>
          </a>
        </div>
      )}
    </div>
  );
}

function TypeChip({ type }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
        type === "work" ? "bg-ink/5 text-ink border border-ink/10" : "bg-accent/10 text-accent border border-accent/20"
      }`}
    >
      {type === "education" && (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )}
      {type === "work" && (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )}
      {type === "work" ? "Experience" : "Education"}
    </span>
  );
}

function JourneyDot({ isCurrent }) {
  return (
    <span
      className={`absolute -left-7 top-[1.9rem] lg:-left-auto lg:left-1/2 lg:top-[4.75rem] w-3 h-3 rounded-full border-3 -translate-x-1/2 z-10 ${
        isCurrent ? "bg-accent border-accent ring-4 ring-accent/20" : "bg-accent border-accent"
      }`}
      aria-hidden="true"
    />
  );
}

function buildJourney() {
  const items = [
    ...education.map((data) => ({ type: "education", data })),
    ...workTimeline.map((data) => ({ type: "work", data })),
  ];
  return items.sort((a, b) => startKey(b.data.period) - startKey(a.data.period));
}

const journey = buildJourney();

export default function JourneySection() {
  return (
    <section id="journey" className="scroll-mt-24 pt-32">
      <SectionHeading
        kicker="Journey"
        number="03"
        title="Journey so far."
        description="From business administration foundations through operations, sales analytics, and research — to information systems in Germany. Each step built the analyst I am today."
      />

      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-1 bottom-1 w-px"
          style={{ background: "linear-gradient(180deg, var(--color-border-strong) 0%, var(--color-border) 100%)" }}
        />

        <div className="space-y-10 lg:space-y-16">
          {journey.map((item, index) => {
            const isEducation = item.type === "education";
            const isCurrent = item.data.period.includes("Present");
            const Card = isEducation ? EducationCard : WorkCard;
            const onLeft = index % 2 === 0;
            return (
              <div
                key={`${item.type}-${item.data.period}`}
                className={`relative pl-7 lg:pl-0 ${
                  onLeft ? "lg:pr-[calc(50%+2.5rem)]" : "lg:pl-[calc(50%+2.5rem)]"
                }`}
              >
                <JourneyDot isCurrent={isCurrent} />

                <span
                  aria-hidden="true"
                  className={`hidden lg:block absolute top-[4.75rem] h-px w-10 ${
                    onLeft ? "left-[calc(50%-2.5rem)]" : "right-[calc(50%-2.5rem)]"
                  }`}
                  style={{ background: "var(--color-border-strong)" }}
                />

                <div className="relative">
                  <Reveal delay={Math.min(index * 60, 240)}>
                    <div className="mb-3">
                      <TypeChip type={item.type} />
                    </div>
                    <Card data={item.data} />
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
