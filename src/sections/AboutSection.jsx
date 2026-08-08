import { profile, currentFocus, learningNow, lifeTimeline } from "../data/profile.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

function CardLabel({ children }) {
  return (
    <span className="label-mono text-accent text-[0.65rem] block mb-3">
      {children}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 pt-32">
      <SectionHeading
        kicker="About"
        number="01"
        title="Hi, I'm Amir."
        description="Master's student in Hamm, Germany — hunting a working-student role in business analysis and digital transformation, with real field experience behind me."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 md:row-span-2 rounded-2xl border border-border bg-card p-7 module-shift">
          <CardLabel>Who I am</CardLabel>
          {profile.bio.map((paragraph, i) => (
            <p
              key={i}
              className="text-soft text-[0.95rem] leading-relaxed mb-4 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 module-shift">
          <CardLabel>Current focus</CardLabel>
          <ul className="space-y-2">
            {currentFocus.map((item) => (
              <li key={item} className="flex gap-2 text-soft text-sm">
                <span className="text-accent shrink-0">▪</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 module-shift">
          <CardLabel>Currently learning</CardLabel>
          <ul className="space-y-2">
            {learningNow.map((item) => (
              <li key={item} className="flex gap-2 text-soft text-sm">
                <span className="text-accent shrink-0">▪</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <Reveal>
          <div className="relative">
            <div className="absolute left-[5px] top-1 bottom-1 w-px bg-border-strong" />
            <div className="space-y-7 pl-7">
              {lifeTimeline.map((step, i) => (
                <div key={step.label} className="relative">
                  <span
                    className={`absolute -left-7 top-1 w-2.5 h-2.5 rounded-full border-2 ${
                      i === lifeTimeline.length - 1
                        ? "bg-accent border-accent"
                        : "bg-card border-border-strong"
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="mono text-muted text-[0.65rem]">
                      {step.period}
                    </span>
                    <h3 className="serif text-base text-ink font-medium">
                      {step.label}
                    </h3>
                  </div>
                  <p className="text-soft text-sm leading-relaxed mt-1 max-w-xl">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
