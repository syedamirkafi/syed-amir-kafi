import { Link } from "react-router";
import { wins } from "../data/wins.js";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
import { useCountUp } from "../lib/useCountUp.js";
import ContactCTA from "../components/ContactCTA.jsx";

function parseValue(v) {
  const m = v.match(/^([^0-9]*)(\d+)(.*)$/);
  return m
    ? { prefix: m[1], num: parseInt(m[2], 10), suffix: m[3] }
    : { prefix: "", num: 0, suffix: v };
}

function RecordValue({ value, accent, highlight }) {
  const { prefix, num, suffix } = parseValue(value);
  const [count, ref] = useCountUp(num, { duration: 1500 });
  return (
    <div
      ref={ref}
      className="head-display text-5xl sm:text-6xl lg:text-7xl leading-none tabular-nums"
      style={{ color: accent }}
    >
      {prefix}
      {count}
      {suffix}
    </div>
  );
}

export default function Wins() {
  useDocumentTitle("The Wins");
  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pt-8">
        <header className="pb-6 mb-10">
          <span className="label-mono text-ink/50">/// 03 — RECORDED OUTCOMES</span>
          <h1 className="head-display text-5xl sm:text-7xl mt-2">The Wins</h1>
          <p className="text-sm text-ink/60 mt-3 max-w-xl">
            Measured outcomes with the story behind each number — what was done,
            at what scale, and what changed.
          </p>
        </header>

        <div className="relative">
          <div className="absolute left-3 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-ink/15" />
          <div className="space-y-12 sm:space-y-16">
            {wins.map((w, i) => {
              const left = i % 2 === 0;
              const rank = w.value.includes("/");
              return (
                <div
                  key={w.label}
                  className={`relative flex sm:items-center gap-6 sm:gap-0 ${
                    left ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <span
                    className="absolute left-3 sm:left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border"
                    style={{
                      backgroundColor: w.accent,
                      borderColor: "var(--color-base)",
                    }}
                  />
                  <div
                    className={`sm:w-[calc(50%-3rem)] ml-10 sm:ml-0 ${
                      left ? "sm:mr-auto sm:pr-4 sm:text-right" : "sm:ml-auto sm:pl-4"
                    }`}
                  >
                    <div className="module-shift border border-ink/20 bg-base p-6 sm:p-8 hover:border-ink/50 transition-all duration-300 relative overflow-hidden">
                      {rank && (
                        <span className="absolute -top-8 -right-8 w-24 h-24 rotate-45 bg-ink text-base flex items-center justify-center label-mono text-[0.55rem]">
                          TOP RANK
                        </span>
                      )}
                      <div className="flex items-baseline justify-between mb-5 gap-3">
                        <span className="label-mono text-ink/40 text-xs">
                          RECORD {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="label-mono text-ink/40 text-xs">
                          {w.year}
                        </span>
                      </div>
                      <RecordValue value={w.value} accent={w.accent} highlight={rank} />
                      <div className="label-mono text-ink/60 text-xs mt-3">
                        {w.label}
                      </div>
                      <p className="text-sm text-ink/70 leading-relaxed mt-4">
                        {w.story}
                      </p>
                      <Link
                        to={w.source}
                        className="mt-5 inline-block label-mono text-xs font-semibold text-vital hover:text-ink transition-colors"
                      >
                        READ THE FIELD REPORT →
                      </Link>
                    </div>
                  </div>
                  <div className="hidden sm:block sm:w-[calc(50%-3rem)]" />
                </div>
              );
            })}
          </div>
        </div>

        <section className="mt-12 mb-16">
          <div className="flex items-baseline justify-between mb-6 pb-2">
            <h2 className="head-display section-title text-3xl sm:text-4xl">Hiring?</h2>
            <span className="label-mono text-ink/50">
              TALK DATA, OPERATIONS, DECISIONS
            </span>
          </div>
          <ContactCTA />
        </section>
      </div>
    </main>
  );
}
