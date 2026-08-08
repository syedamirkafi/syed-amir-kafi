import { certifications } from "../data/timeline.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

const STATUS_STYLES = {
  earned: "border-emerald-700/40 text-emerald-800",
  "in-progress": "border-accent text-accent-ink",
  planned: "border-border-strong text-soft",
};

const STATUS_LABEL = {
  earned: "Earned",
  "in-progress": "In progress",
  planned: "Planned",
};

export default function CertificationsSection() {
  return (
    <section id="certifications" className="scroll-mt-24 pt-32">
      <SectionHeading
        kicker="Certifications"
        number="07"
        title="Certifications."
        description="The credentials backing the day-to-day work — earned, in progress, or planned."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {certifications.map((cert, idx) => (
          <Reveal key={cert.credential} delay={Math.min(idx * 40, 160)}>
            <div className="h-full rounded-2xl border border-border bg-card p-5 module-shift flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="label-mono text-accent text-[0.6rem]">
                  {cert.provider}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 label-mono text-[0.55rem] ${STATUS_STYLES[cert.status]}`}
                >
                  {STATUS_LABEL[cert.status]}
                </span>
              </div>
              <h3 className="serif text-ink text-sm font-medium leading-snug mb-auto">
                {cert.credential}
              </h3>
              <span className="mono text-muted text-[0.6rem] mt-3">
                {cert.date}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
