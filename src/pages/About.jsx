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
        </header>

        <section className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-0.5">
          <div className="bg-ink/3 border border-ink/20 p-8 transition-all duration-300">
            <span className="label-mono text-ink/40">LOCATION</span>
            <p className="head-display text-2xl mt-4 leading-tight">
              {profile.location}
            </p>
            <p className="label-mono text-ink/50 mt-3">HAMM · NRW · GERMANY</p>
          </div>
          <div className="bg-ink/3 border border-ink/20 p-8 transition-all duration-300">
            <span className="label-mono text-ink/40">CONTACT</span>
            <a
              href={`mailto:${profile.email}`}
              className="head-display text-xl mt-4 block leading-tight break-all hover:text-vital transition-colors"
            >
              {profile.email}
            </a>
            <p className="label-mono text-ink/50 mt-3">{profile.phone}</p>
          </div>
          <div className="bg-ink/3 border border-ink/20 p-8 transition-all duration-300">
            <span className="label-mono text-ink/40">LANGUAGES</span>
            <div className="mt-4 space-y-2">
              {profile.languages.map((lang) => (
                <div key={lang.code} className="flex items-baseline justify-between gap-4">
                  <span className="head-display text-xl">
                    {lang.code}
                    <span className="label-mono text-ink/40 ml-2">
                      {lang.name}
                    </span>
                  </span>
                  <span className="label-mono text-ink/50 text-right">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 mb-16">
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

        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-baseline justify-between mb-6 pb-2">
              <h2 className="head-display section-title text-3xl">Education</h2>
              <span className="label-mono text-ink/50">DEGREES</span>
            </div>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={edu.degree} className="bg-base border border-ink/20 p-6 hover:border-ink/40 transition-all duration-300">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="label-mono text-vital text-xs">
                      {String(i + 1).padStart(2, "0")} · {edu.period}
                    </span>
                  </div>
                  <h3 className="head-display text-xl leading-tight">{edu.degree}</h3>
                  <p className="label-mono text-ink/50 text-xs mt-3">
                    {edu.org} · {edu.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-6 pb-2">
              <h2 className="head-display section-title text-3xl">Certifications</h2>
              <span className="label-mono text-ink/50">VERIFIED TRACKS</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="border border-ink/25 bg-ink/3 px-4 py-3 label-mono text-xs hover:border-ink transition-all duration-200"
                >
                  <span className="text-vital mr-2">✓</span>
                  {cert}
                </span>
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
