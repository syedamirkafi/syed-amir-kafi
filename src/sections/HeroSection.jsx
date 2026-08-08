import { useEffect, useState } from "react";
import { Link } from "react-router";
import { profile } from "../data/profile.js";
import { wins } from "../data/wins.js";
import { withBase } from "../lib/base.js";
import { useCountUp } from "../lib/useCountUp.js";

function Stat({ value, suffix, label }) {
  const m = value.match(/^([^0-9]*)(\d+)(.*)$/);
  const prefix = m ? m[1] : "";
  const num = m ? parseInt(m[2], 10) : 0;
  const tail = m ? m[3] : value;
  const [count, ref] = useCountUp(num, { duration: 1500 });

  return (
    <div ref={ref}>
      <div className="serif text-3xl sm:text-4xl text-ink tabular-nums leading-none">
        {prefix}
        {count}
        {tail}
      </div>
      <div className="label-mono text-muted text-[0.6rem] mt-2 max-w-[12rem]">
        {label}
      </div>
    </div>
  );
}

function PortraitFrame() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative">
      <div className="rounded-2xl overflow-hidden border border-border-strong bg-card aspect-[4/5] w-full relative">
        {!failed ? (
          <img
            src={withBase(profile.portrait)}
            alt="Portrait of Syed Amir Kafi"
            className="w-full h-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-base">
            <div className="w-24 h-24 rounded-full border-2 border-accent flex items-center justify-center">
              <span className="serif text-3xl text-ink">AK</span>
            </div>
            <span className="label-mono text-muted text-[0.65rem]">
              Syed Amir Kafi
            </span>
          </div>
        )}
      </div>

      <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-accent bg-base/90 backdrop-blur px-3 py-1.5 label-mono text-[0.58rem] text-accent-ink">
        <span className="w-1.5 h-1.5 rounded-full bg-accent kf-pulse" />
        Open to BA roles
      </div>

      <div className="absolute -bottom-3 -right-3 rounded-full border border-border-strong bg-base px-3 py-1.5 label-mono text-[0.58rem] text-soft">
        {profile.location}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const topWins = wins.slice(0, 4);

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace("#", "");
      if (id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <section id="top" className="relative">
      <div className="max-w-4xl mx-auto px-6 pt-20 lg:pt-32 pb-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-center">
          {/* Left column — text */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-accent" />
              <span className="label-mono text-accent text-[0.65rem]">
                {profile.eyebrow}
              </span>
            </div>

            <h1 className="head-display text-5xl sm:text-6xl lg:text-7xl text-ink mb-7">
              {profile.headline}
            </h1>

            <p className="serif text-xl sm:text-2xl text-ink/85 leading-snug max-w-xl mb-3">
              {profile.subheadline}
            </p>

            <p className="text-soft text-base leading-relaxed max-w-xl mb-9">
              {profile.positioning}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-12">
              <a
                href={withBase(profile.cvUrl)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink hover:bg-ink/85 text-base text-sm font-medium px-5 py-2.5 transition-colors"
              >
                Résumé ↓
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border-strong hover:border-ink hover:text-ink text-soft text-sm font-medium px-5 py-2.5 transition-colors"
              >
                Email me
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full text-soft hover:text-ink text-sm font-medium px-4 py-2.5 transition-colors"
              >
                LinkedIn →
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border pt-7">
              {topWins.map((w) => (
                <Stat key={w.label} value={w.value} label={w.label} />
              ))}
            </div>
          </div>

          {/* Right column — portrait */}
          <div className="mt-12 lg:mt-0 lg:col-span-5">
            <PortraitFrame />
          </div>
        </div>
      </div>
    </section>
  );
}
