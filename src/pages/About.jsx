import { profile } from "../data/profile.js";
import { timeline, education, certifications } from "../data/timeline.js";
import SkillGrid from "../components/SkillGrid.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import { withBase } from "../lib/base.js";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";

export default function About() {
  useDocumentTitle("Full Chronicle");
  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pt-8">
        <header className="pb-6 mb-10">
          <span className="label-mono text-ink/50">/// CHRONICLE</span>
          <h1 className="head-display text-5xl sm:text-7xl mt-2">
            Full Chronicle
          </h1>
          <p className="text-sm text-ink/60 mt-3 max-w-xl">
            {profile.tagline}
          </p>
        </header>

        <section className="mb-16">
          <div className="flex items-baseline justify-between mb-6 pb-2">
            <h2 className="head-display section-title text-3xl sm:text-4xl">The Author</h2>
            <span className="label-mono text-ink/50">WHO</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-5">
              {profile.bio.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg text-ink/80 leading-relaxed max-w-prose"
                >
                  {paragraph}
                </p>
              ))}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={withBase(profile.cvUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-accent text-base label-mono font-semibold hover:bg-ink transition-all duration-300"
                >
                  CV ↓
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="px-6 py-3 border border-ink label-mono font-semibold hover:bg-ink/5 transition-all duration-300"
                >
                  EMAIL
                </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 border border-ink label-mono font-semibold hover:bg-ink/5 transition-all duration-300"
                  >
                    LINKEDIN
                  </a>
                </div>
              </div>
            <div className="md:col-span-5">
              <div className="p-6 space-y-4">
                <div>
                  <span className="label-mono text-ink/40 text-xs">LOCATION</span>
                  <p className="label-mono mt-1">{profile.location}</p>
                </div>
                <div>
                  <span className="label-mono text-ink/40 text-xs">CONTACT</span>
                  <p className="label-mono mt-1">{profile.email}</p>
                  <p className="label-mono mt-1">{profile.phone}</p>
                </div>
                <div>
                  <span className="label-mono text-ink/40 text-xs">LANGUAGES</span>
                  {profile.languages.map((lang) => (
                    <p key={lang.code} className="label-mono mt-1">
                      {lang.code} · {lang.name} — {lang.level}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-baseline justify-between mb-6 pb-2">
            <h2 className="head-display section-title text-3xl sm:text-4xl">Toolbox</h2>
            <span className="label-mono text-ink/50">SKILLS</span>
          </div>
          <SkillGrid />
        </section>

        <section className="mb-16">
          <div className="flex items-baseline justify-between mb-6 pb-2">
            <h2 className="head-display section-title text-3xl sm:text-4xl">Experience</h2>
            <span className="label-mono text-ink/50">FIELD LOG</span>
          </div>
          <div className="space-y-6">
            {timeline.map((job) => (
              <div key={job.org} className="border-b border-ink/20 pb-6 last:border-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h3 className="head-display text-2xl">{job.role}</h3>
                  <span className="label-mono text-ink/50 text-xs">
                    {job.period}
                  </span>
                </div>
                <p className="label-mono text-vital text-xs mb-4">
                  {job.org} — {job.location}
                </p>
                <ul className="space-y-2">
                    {job.points.map((point, i) => (
                      <li
                        key={i}
                        className="text-sm text-ink/75 leading-relaxed flex gap-3"
                      >
                        <span className="label-mono text-ink/30 shrink-0">
                          ▪
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6">
            <div className="flex items-baseline justify-between mb-6 pb-2">
              <h2 className="head-display section-title text-3xl">Education</h2>
            </div>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.degree} className="border-b border-ink/20 pb-4 last:border-0">
                  <h3 className="head-display text-lg">{edu.degree}</h3>
                  <p className="label-mono text-vital text-xs mt-1">{edu.org}</p>
                  <p className="label-mono text-ink/40 text-xs mt-1">
                    {edu.period} · {edu.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="flex items-baseline justify-between mb-6 pb-2">
              <h2 className="head-display section-title text-3xl">Certifications</h2>
            </div>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <li key={cert} className="flex gap-3 text-sm text-ink/75 list-none">
                  <span className="label-mono text-vital shrink-0">✓</span>
                  <span>{cert}</span>
                </li>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <ContactCTA />
        </section>
      </div>
    </main>
  );
}
