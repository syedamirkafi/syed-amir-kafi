import { timeline as workTimeline } from "../data/timeline.js";
import { education, certifications } from "../data/timeline.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import { withBase } from "../lib/base.js";

function isHRChip(c) {
  return c === "HR Analytics" || c === "Organizational Behavior";
}

const STATUS_STYLES = {
  earned: "border-emerald/40 text-emerald",
  "in-progress": "border-accent text-goldtext",
  planned: "border-border-strong text-soft",
};

const STATUS_LABEL = {
  earned: "Earned",
  "in-progress": "In progress",
  planned: "Planned",
};

function TimelineDot({ type, isLast, isCurrent }) {
  const base = "absolute -left-7 top-3 w-3 h-3 rounded-full border-3 flex-shrink-0";
  if (isCurrent) return <span className={`${base} bg-accent border-accent ring-4 ring-accent/20`} aria-hidden="true" />;
  if (type === "education") return <span className={`${base} bg-accent border-accent`} aria-hidden="true" />;
  if (type === "work") return <span className={`${base} bg-ink border-ink`} aria-hidden="true" />;
  if (type === "certification") return <span className={`${base} bg-emerald border-emerald`} aria-hidden="true" />;
  return <span className={`${base} bg-card border-border-strong`} aria-hidden="true" />;
}

function TimelineLine({ isLast }) {
  return (
    <span
      className={`absolute left-[-5px] top-3 bottom-0 w-px ${isLast ? "hidden" : "block"}`}
      style={{ background: "linear-gradient(180deg, var(--color-border-strong) 0%, var(--color-border) 100%)" }}
      aria-hidden="true"
    />
  );
}

function EducationCard({ data }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 module-shift">
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
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 module-shift">
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
      {data.workSamples && data.workSamples.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <a
            href={`#work`}
            className="inline-flex items-center gap-1.5 label-mono text-[0.6rem] text-accent hover:text-ink transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View work sample →
          </a>
        </div>
      )}
    </div>
  );
}

function CertificationCard({ cert }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 module-shift flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="label-mono text-accent text-[0.6rem]">{cert.provider}</span>
        <span className={`rounded-full border px-2 py-0.5 label-mono text-[0.55rem] ${STATUS_STYLES[cert.status]}`}>
          {STATUS_LABEL[cert.status]}
        </span>
      </div>
      <h4 className="serif text-ink text-sm font-medium leading-snug mb-auto">{cert.credential}</h4>
      <span className="mono text-muted text-[0.6rem] mt-3">{cert.date}</span>
    </div>
  );
}

function buildUnifiedTimeline() {
  const items = [];

  // Education entries
  education.forEach((edu) => {
    items.push({
      type: "education",
      period: edu.period,
      sortKey: edu.period.split("—")[0].trim().split(" ").pop(), // year start
      data: edu,
      component: EducationCard,
      label: edu.degree,
      org: edu.org,
    });
  });

  // Work entries
  workTimeline.forEach((job) => {
    items.push({
      type: "work",
      period: job.period,
      sortKey: job.period.split("—")[0].trim().split(" ").pop(),
      data: job,
      component: WorkCard,
      label: job.role,
      org: job.org,
    });
  });

  // Certification entries (grouped as one timeline item at the end)
  if (certifications.length > 0) {
    items.push({
      type: "certification",
      period: "Ongoing",
      sortKey: "9999",
      data: certifications,
      component: ({ data }) => (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.map((cert) => <CertificationCard key={cert.credential} cert={cert} />)}
        </div>
      ),
      label: "Certifications",
      org: "Professional Credentials",
    });
  }

  // Sort chronologically
  return items.sort((a, b) => parseInt(a.sortKey) - parseInt(b.sortKey));
}

const unifiedTimeline = buildUnifiedTimeline();

export default function EducationCredentials() {
  return (
    <section id="credentials" className="scroll-mt-24 pt-32">
      <SectionHeading
        kicker="Journey"
        number="04"
        title="Education & Career Journey."
        description="From business administration foundations through operations, sales analytics, and research — to information systems in Germany. Each step built the analyst I am today."
      />

      <Reveal>
        <div className="relative">
          <div className="absolute left-[5px] top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, var(--color-border-strong) 0%, var(--color-border) 100%)" }} aria-hidden="true" />
          
          <div className="space-y-10 pl-7">
            {unifiedTimeline.map((item, index) => (
              <div key={`${item.type}-${item.label}-${index}`} className="relative">
                <TimelineDot type={item.type} isLast={index === unifiedTimeline.length - 1} isCurrent={item.type === "work" && item.data.period.includes("Present")} />
                <TimelineLine isLast={index === unifiedTimeline.length - 1} />
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="mono text-muted text-[0.65rem] whitespace-nowrap">{item.period}</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      item.type === "education" ? "bg-accent/10 text-accent border border-accent/20" :
                      item.type === "work" ? "bg-ink/5 text-ink border border-ink/10" :
                      "bg-emerald/10 text-emerald border border-emerald/20"
                    }`}>
                      {item.type === "education" && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /></svg>}
                      {item.type === "work" && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                      {item.type === "certification" && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                      {item.type === "education" ? "Education" : item.type === "work" ? "Experience" : "Certification"}
                    </span>
                  </div>
                  
                  <div className="ml-0">
                    {item.component({ data: item.data })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}