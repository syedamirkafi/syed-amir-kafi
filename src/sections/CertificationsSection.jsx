import { certifications } from "../data/timeline.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

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

function CertificationCard({ cert }) {
  return (
    <div className="rounded-2xl border border-border glass-card p-5 module-shift flex flex-col">
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

export default function CertificationsSection() {
  return (
    <section id="certifications" className="scroll-mt-24 pt-32">
      <SectionHeading
        kicker="Certifications"
        number="04"
        title="Certifications."
        description="Credentials I'm earning and working toward as I deepen the analysis side of the work."
      />

      <Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <CertificationCard key={cert.credential} cert={cert} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
