import { skillGroups, systemSkills } from "../data/skills.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

function GroupIcon({ name }) {
  const common = {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };
  if (name === "sparkles")
    return (
      <svg {...common}>
        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
      </svg>
    );
  if (name === "grid")
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 pt-32">
      <SectionHeading
        kicker="Skills"
        number="04"
        title="Skills."
        description="The things I reach for in day-to-day work — no proficiency bars, just what I actually use."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skillGroups.map((group, idx) => (
          <Reveal key={group.id} delay={Math.min(idx * 60, 180)}>
            <div className="h-full rounded-2xl border border-border bg-card p-6 module-shift">
              <div className="flex items-center gap-3 mb-1">
                <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-base text-accent-ink">
                  <GroupIcon name={group.icon} />
                </span>
                <h3 className="serif text-ink font-medium text-base">
                  {group.label}
                </h3>
              </div>
              <p className="text-muted text-xs mb-4 ml-12">{group.description}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-base px-3 py-1.5 text-soft text-xs hover:border-accent hover:text-ink transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-5">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label-mono text-accent text-[0.65rem] mr-2">
              Enterprise systems I've worked in
            </span>
            {systemSkills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border-strong bg-base px-3 py-1 text-soft text-xs"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
