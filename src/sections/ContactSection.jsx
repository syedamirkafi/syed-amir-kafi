import { profile } from "../data/profile.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

function ContactRow({ label, value, href, external }) {
  const cls =
    "group flex items-baseline justify-between gap-4 py-4 border-t border-border last:border-b";
  const inner = (
    <>
      <span className="label-mono text-muted text-[0.6rem] shrink-0 pt-1">
        {label}
      </span>
      <span className="serif text-ink text-lg text-right group-hover:text-goldtext transition-colors break-all">
        {value}
        {external && (
          <span className="ml-2 text-soft group-hover:text-accent transition-colors" aria-hidden="true">
            ↗
          </span>
        )}
      </span>
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 pt-32">
      <SectionHeading
        kicker="Contact"
        number="05"
        title="Get in touch."
        description="Hunting a working-student or intern role in Germany — business analysis, digital transformation, or anywhere my data and process skills fit. Open to a quick call; happy to grab 30 minutes."
      />

      <Reveal>
        <div className="rounded-2xl border border-border bg-card p-7 sm:p-9">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent kf-pulse" aria-hidden="true" />
            <span className="label-mono text-accent text-[0.65rem]">
              {profile.availabilityWindow}
            </span>
          </div>

          <ContactRow
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
          <ContactRow
            label="LinkedIn"
            value="linkedin.com/in/syedamirkafi"
            href={profile.linkedin}
            external
          />
          <ContactRow
            label="GitHub"
            value="github.com/syedamirkafi"
            href={profile.github}
            external
          />
          <ContactRow
            label="Location"
            value={profile.location}
            href="#contact"
          />
        </div>
      </Reveal>
    </section>
  );
}
