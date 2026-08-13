import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile.js";
import { withBase } from "../lib/base.js";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion.js";

function useHeroFold() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [fold, setFold] = useState(0);

  useEffect(() => {
    if (reduced) {
      setFold(0);
      return;
    }
    let raf;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.85)));
      setFold(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return { ref, fold };
}

function PortraitFrame() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden border border-border-strong bg-card aspect-[4/5] w-full relative shadow-[0_24px_48px_-28px_rgba(22,21,19,0.35)]">
      {!failed ? (
        <img
          src={withBase(profile.portrait)}
          alt={`Portrait of ${profile.name}`}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
          width={400}
          height={500}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-base">
          <div className="w-24 h-24 rounded-full border-2 border-accent flex items-center justify-center">
            <span className="serif text-3xl text-ink">AK</span>
          </div>
          <span className="label-mono text-muted text-[0.65rem]">
            {profile.name}
          </span>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-4 pt-12 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
        <div className="serif text-white text-lg font-medium leading-tight">
          {profile.name}
        </div>
        <div className="mono text-white/85 text-[0.62rem] tracking-wide mt-1">
          {profile.role}
        </div>
      </div>
    </div>
  );
}

const proofPoints = [
  { metric: "18%", label: "Territory sales growth in one season", context: "Robi Axiata Ltd." },
  { metric: "80+", label: "Clients delivered — research & analysis", context: "Assignoholic" },
  { metric: "14", label: "Sales reps + IT + back-office led", context: "Territory Officer" },
];

export default function HeroSection() {
  const { ref, fold } = useHeroFold();

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
    <section
      id="top"
      ref={ref}
      className="relative"
      style={
        fold > 0
          ? {
              clipPath: `inset(0 0 ${fold * 100}% 0)`,
              willChange: "clip-path",
            }
          : undefined
      }
    >
      <div className="max-w-6xl mx-auto px-6 pt-20 lg:pt-32 pb-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
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

            <p className="serif text-xl sm:text-2xl text-ink/85 leading-snug max-w-xl mb-9">
              {profile.subheadline}
            </p>

            {/* Proof points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {proofPoints.map((point, i) => (
                <div key={i} className="rounded-xl border border-border glass-card p-4 module-shift">
                  <div className="serif text-3xl sm:text-4xl text-ink font-medium tabular-nums">
                    {point.metric}
                  </div>
                  <div className="text-soft text-sm leading-snug mt-1">
                    {point.label}
                  </div>
                  <div className="label-mono text-muted text-[0.55rem] mt-2">
                    {point.context}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-12">
              <a
                href={withBase(profile.cvUrl)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink hover:bg-ink/85 text-paper text-sm font-medium px-5 py-2.5 transition-colors"
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
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Right column — portrait */}
          <div className="mt-12 lg:mt-0 lg:col-span-5">
            <PortraitFrame />

            <div className="mt-5 rounded-2xl border border-border glass-card p-4 module-shift">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 label-mono text-[0.6rem] text-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent kf-pulse" />
                  {profile.availability}
                </span>
                <span className="mono text-[0.62rem] text-muted">
                  {profile.location}
                </span>
              </div>

              <div className="h-px bg-border my-3.5" />

              <div className="flex flex-wrap gap-2">
                {profile.languages.map((lang) => (
                  <span
                    key={lang.code}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-base px-3 py-1.5 text-xs text-soft"
                  >
                    <span className="mono text-[0.65rem] text-accent font-semibold">
                      {lang.code}
                    </span>
                    {lang.level}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}