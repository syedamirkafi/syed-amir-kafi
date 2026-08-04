import { useEffect, useState } from "react";
import { withBase } from "../lib/base.js";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion.js";
import { useCountUp } from "../lib/useCountUp.js";

function StatusBadge({ status }) {
  const inProgress = status === "in-progress";
  return (
    <span
      className={`label-mono text-[0.6rem] px-2 py-1 border ${
        inProgress
          ? "border-vital text-ink bg-vital/20"
          : "border-ink/40 text-ink/60"
      }`}
    >
      {inProgress ? "● IN PROGRESS" : "✓ SHIPPED"}
    </span>
  );
}

function ProjectLink({ item }) {
  const external = /^https?:\/\//.test(item.href);
  const label = external
    ? item.id === "pivot"
      ? "VIEW ON GITHUB ↗"
      : "VISIT PLATFORM ↗"
    : item.href === "/"
      ? "EXPLORE THIS SITE →"
      : "READ CASE STUDY →";
  return (
    <a
      href={external ? item.href : withBase(item.href)}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="mt-6 inline-block label-mono text-sm font-semibold text-vital hover:text-ink transition-colors"
    >
      {label}
    </a>
  );
}

function useTyping(totalChars, { charDelay = 26, startDelay = 400 } = {}) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(reduced ? totalChars : 0);

  useEffect(() => {
    if (reduced) return;
    let interval = 0;
    const timer = window.setTimeout(() => {
      let c = 0;
      interval = window.setInterval(() => {
        c += 1;
        setCount(c);
        if (c >= totalChars) window.clearInterval(interval);
      }, charDelay);
    }, startDelay);
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, [totalChars, charDelay, startDelay, reduced]);

  return count;
}

export function KanbanShowcase({ item }) {
  const lanes = ["APPLIED", "INTERVIEWING", "OFFER"];
  const laneCards = [
    ["Data Analyst @ FinCo", "Ops @ StartupX"],
    ["BI Analyst @ Retail", "Process Eng @ Logi"],
    ["Offer — Data Ops"],
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-ink/20 module-shift bg-base">
      <div className="lg:col-span-7 p-6 sm:p-10 bg-ink text-base flex items-center overflow-hidden">
        <div className="w-full">
          <div className="flex items-center gap-1.5 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="label-mono text-base/50 text-[0.6rem] ml-3">
              PIVOT / JOB PIPELINE
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 relative overflow-hidden">
            {lanes.map((lane, li) => (
              <div
                key={lane}
                className="border border-base/15 p-3 min-h-[170px]"
              >
                <span className="label-mono text-base/50 text-[0.6rem]">
                  {lane}
                </span>
                <div className="mt-3 space-y-2">
                  {laneCards[li]?.map((card) => (
                    <div
                      key={card}
                      className="border border-base/25 bg-base/5 p-2 label-mono text-[0.6rem] leading-snug"
                    >
                      {card}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="absolute left-0 top-9 w-[30%] kcard pointer-events-none">
              <div className="bg-vital text-base p-2 label-mono text-[0.6rem] shadow-lg">
                ⚡ AI TAG + EXTRACT
              </div>
            </div>
          </div>
          <div className="label-mono text-base/50 text-[0.6rem] mt-6 kf-pulse">
            DOC GENERATION · DATA EXTRACTION · KANBAN · CALENDAR · ANALYTICS
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <StatusBadge status={item.status} />
          <span
            className="label-mono text-[0.6rem] px-2 py-1 text-base"
            style={{ backgroundColor: item.color }}
          >
            {item.tag}
          </span>
        </div>
        <h2 className="head-display text-3xl sm:text-4xl mb-4">{item.title}</h2>
        <p className="text-sm text-ink/70 leading-relaxed mb-5">
          {item.description}
        </p>
        <div className="label-mono text-ink/40 text-xs">
          {item.tags.join(" · ")}
        </div>
        <ProjectLink item={item} />
      </div>
    </div>
  );
}

export function PipelineShowcase({ item }) {
  const [offers] = useCountUp(700, { duration: 1600 });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-ink/20 module-shift bg-base">
      <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center order-2 lg:order-1">
        <div className="flex items-center gap-3 mb-4">
          <StatusBadge status={item.status} />
          <span
            className="label-mono text-[0.6rem] px-2 py-1 text-base"
            style={{ backgroundColor: item.color }}
          >
            {item.tag}
          </span>
        </div>
        <h2 className="head-display text-3xl sm:text-4xl mb-4">{item.title}</h2>
        <p className="text-sm text-ink/70 leading-relaxed mb-5">
          {item.description}
        </p>
        <div className="label-mono text-ink/40 text-xs">
          {item.tags.join(" · ")}
        </div>
        <ProjectLink item={item} />
      </div>
      <div className="lg:col-span-7 p-6 sm:p-10 bg-ink text-base flex items-center order-1 lg:order-2">
        <div className="w-full">
          <span className="label-mono text-base/50 text-[0.6rem]">
            CAREER-OPS / AI EVALUATION PIPELINE
          </span>
          <div className="flex items-center gap-2 sm:gap-3 mt-8 flex-wrap">
            <div className="border border-base/30 px-4 py-3 text-center">
              <div className="head-display text-3xl" ref={offers}>
                {offers}+
              </div>
              <div className="label-mono text-base/50 text-[0.55rem] mt-1">
                OFFERS
              </div>
            </div>
            <svg
              className="w-8 sm:w-12 shrink-0"
              height="8"
              viewBox="0 0 60 8"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="4"
                x2="60"
                y2="4"
                stroke="var(--color-base)"
                strokeOpacity="0.4"
                strokeWidth="2"
                className="pipeline-dash"
              />
            </svg>
            <div className="border border-base/30 px-4 py-3 text-center kf-pulse">
              <div className="head-display text-3xl">AI</div>
              <div className="label-mono text-base/50 text-[0.55rem] mt-1">
                SCORE
              </div>
            </div>
            <svg
              className="w-8 sm:w-12 shrink-0"
              height="8"
              viewBox="0 0 60 8"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="4"
                x2="60"
                y2="4"
                stroke="var(--color-base)"
                strokeOpacity="0.4"
                strokeWidth="2"
                className="pipeline-dash"
              />
            </svg>
            <div className="border border-base/30 px-4 py-3 text-center">
              <div className="head-display text-3xl">#</div>
              <div className="label-mono text-base/50 text-[0.55rem] mt-1">
                RANK
              </div>
            </div>
            <svg
              className="w-8 sm:w-12 shrink-0"
              height="8"
              viewBox="0 0 60 8"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="4"
                x2="60"
                y2="4"
                stroke="var(--color-base)"
                strokeOpacity="0.4"
                strokeWidth="2"
                className="pipeline-dash"
              />
            </svg>
            <div className="border border-base/30 px-4 py-3 text-center kf-pulse">
              <div className="head-display text-3xl">CV</div>
              <div className="label-mono text-base/50 text-[0.55rem] mt-1">
                GENERATED
              </div>
            </div>
          </div>
          <div className="label-mono text-base/50 text-[0.6rem] mt-8">
            ATS-OPTIMIZED · SCORED & RANKED · TRACKED END-TO-END
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChartShowcase({ item }) {
  const bars = [38, 62, 45, 74, 58, 92, 66, 81, 54, 96, 70, 88];
  const [growth] = useCountUp(18);
  return (
    <div className="border border-ink/20 module-shift bg-base p-6 sm:p-10">
      <div className="lg:grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-6">
            <span className="label-mono text-ink/40 text-[0.6rem]">
              TABLEAU / SALES PERFORMANCE
            </span>
            <span className="label-mono text-[0.6rem] border border-ink px-2 py-1 kf-pulse">
              LIVE
            </span>
          </div>
          <div className="flex items-end gap-1.5 sm:gap-2 h-40 sm:h-52 border-b border-ink/15">
            {bars.map((h, i) => (
              <div
                key={i}
                className="kbar flex-1"
                style={{
                  height: `${h}%`,
                  backgroundColor: i % 4 === 3 ? "#D90429" : "#2563EB",
                  opacity: i % 4 === 3 ? 1 : 0.35,
                  animationDelay: `${i * 0.18}s`,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between label-mono text-ink/40 text-[0.55rem] mt-2">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i}>{String(i + 1).padStart(2, "0")}</span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 mt-8 lg:mt-0">
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge status={item.status} />
            <span
              className="label-mono text-[0.6rem] px-2 py-1 text-base"
              style={{ backgroundColor: item.color }}
            >
              {item.tag}
            </span>
          </div>
          <h2 className="head-display text-3xl sm:text-4xl mb-4">
            {item.title}
          </h2>
          <p className="text-sm text-ink/70 leading-relaxed mb-6">
            {item.description}
          </p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { v: `${growth}%`, l: "TERRITORY GROWTH" },
              { v: "17", l: "PERSON TEAM" },
              { v: "3×", l: "DAILY/WEEKLY/MONTHLY" },
            ].map((s) => (
              <div key={s.l} className="border border-ink/20 p-3">
                <div className="head-display text-2xl" style={{ color: "#D90429" }}>
                  {s.v}
                </div>
                <div className="label-mono text-ink/40 text-[0.55rem] mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
          <div className="label-mono text-ink/40 text-xs">
            {item.tags.join(" · ")}
          </div>
          <ProjectLink item={item} />
        </div>
      </div>
    </div>
  );
}

export function ProcessShowcase({ item }) {
  const steps = [
    { label: "RECEIVE", removed: false },
    { label: "STAGE", removed: false },
    { label: "HANDOFF 1", removed: true },
    { label: "RE-CHECK", removed: true },
    { label: "PICK", removed: false },
    { label: "SHIP", removed: false },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-ink/20 module-shift bg-base">
      <div className="lg:col-span-7 p-6 sm:p-10 bg-ink text-base flex items-center">
        <div className="w-full">
          <span className="label-mono text-base/50 text-[0.6rem]">
            BPMN / ORDER PICKING
          </span>
          <div className="flex flex-wrap items-center gap-2 mt-8">
            {steps.map((s, i) => (
              <span key={i} className="flex items-center gap-2">
                <div
                  className={`px-3 py-2 label-mono text-[0.65rem] border ${
                    s.removed
                      ? "kstep-remove border-destructive/70 text-base/60"
                      : "border-base/30"
                  }`}
                >
                  {s.removed && (
                    <span className="text-destructive mr-1">✕</span>
                  )}
                  {s.label}
                </div>
                {i < steps.length - 1 && (
                  <span className="text-base/40">→</span>
                )}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-10">
            <span className="head-display text-5xl sm:text-6xl text-base">
              −2
            </span>
            <div>
              <div className="label-mono text-base/70 text-[0.65rem]">
                STEPS REMOVED FROM THE PROCESS
              </div>
              <div className="label-mono text-base/50 text-[0.6rem] mt-1">
                MAPPED · DOCUMENTED · CROSS-FUNCTIONAL
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <StatusBadge status={item.status} />
          <span
            className="label-mono text-[0.6rem] px-2 py-1 text-base"
            style={{ backgroundColor: item.color }}
          >
            {item.tag}
          </span>
        </div>
        <h2 className="head-display text-3xl sm:text-4xl mb-4">{item.title}</h2>
        <p className="text-sm text-ink/70 leading-relaxed mb-5">
          {item.description}
        </p>
        <div className="label-mono text-ink/40 text-xs">
          {item.tags.join(" · ")}
        </div>
        <ProjectLink item={item} />
      </div>
    </div>
  );
}

export function ResearchShowcase({ item }) {
  const [clients] = useCountUp(80, { duration: 1500 });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-ink/20 module-shift bg-base">
      <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-center order-2 lg:order-1">
        <div className="flex items-center gap-3 mb-4">
          <StatusBadge status={item.status} />
          <span
            className="label-mono text-[0.6rem] px-2 py-1 text-base"
            style={{ backgroundColor: item.color }}
          >
            {item.tag}
          </span>
        </div>
        <h2 className="head-display text-3xl sm:text-4xl mb-4">{item.title}</h2>
        <p className="text-sm text-ink/70 leading-relaxed mb-5">
          {item.description}
        </p>
        <div className="label-mono text-ink/40 text-xs">
          {item.tags.join(" · ")}
        </div>
        <ProjectLink item={item} />
      </div>
      <div className="lg:col-span-7 p-6 sm:p-10 bg-ink text-base flex items-center justify-center overflow-hidden order-1 lg:order-2">
        <div className="w-full flex items-center gap-10 sm:gap-16">
          <div className="relative h-56 sm:h-64 w-40 sm:w-52 shrink-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="kdoc absolute inset-0 border border-base/20 bg-ink p-3"
                style={{
                  transform: `rotate(${(i - 2) * 5}deg)`,
                  zIndex: i,
                  animationDelay: `${i * 0.25}s`,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                }}
              >
                <div className="h-2 w-3/5 bg-base/25 mb-2" />
                <div className="h-1.5 w-4/5 bg-base/15 mb-1" />
                <div className="h-1.5 w-2/3 bg-base/15 mb-4" />
                <span className="label-mono text-base/40 text-[0.55rem]">
                  CLIENT REPORT {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
          <div>
            <div className="head-display text-6xl sm:text-7xl text-base" ref={clients}>
              {clients}+
            </div>
            <div className="label-mono text-base/70 text-[0.65rem] mt-2">
              UNIVERSITY CLIENTS SERVED
            </div>
            <div className="label-mono text-base/50 text-[0.6rem] mt-1">
              BUSINESS · IT · REMOTE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TerminalShowcase({ item }) {
  const lines = [
    "$ vite build --base /the-monolith",
    "✓ 555 modules transformed",
    "✓ zero database",
    "✓ markdown-powered posts",
    "✓ night mode · RSS · accessible",
    "$ ship → gh-pages",
  ];
  const total = lines.join("\n").length;
  const count = useTyping(total);
  const offsets = [];
  let acc = 0;
  lines.forEach((l) => {
    offsets.push(acc);
    acc += l.length + 1;
  });
  let activeLine = 0;
  for (let i = 0; i < lines.length; i++) {
    if (count >= offsets[i]) activeLine = i;
  }

  return (
    <div className="border border-ink/20 module-shift bg-base p-6 sm:p-10">
      <div className="bg-ink text-base">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-base/15">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="label-mono text-base/50 text-[0.6rem] ml-3">
            ~/this-site — zsh
          </span>
        </div>
        <div className="p-5 sm:p-7 font-mono text-[0.75rem] sm:text-[0.85rem] leading-relaxed whitespace-pre-wrap">
          {lines.map((line, i) => {
            const shown = Math.max(0, Math.min(line.length, count - offsets[i]));
            const isActive = i === activeLine;
            return (
              <div key={i}>
                <span className={line.startsWith("✓") ? "text-emerald-400" : ""}>
                  {line.slice(0, shown)}
                </span>
                {isActive && count < total && (
                  <span className="term-cursor" style={{ background: "var(--color-base)" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="pt-8 sm:pt-10 lg:grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge status={item.status} />
            <span
              className="label-mono text-[0.6rem] px-2 py-1 text-base"
              style={{ backgroundColor: item.color }}
            >
              {item.tag}
            </span>
          </div>
          <h2 className="head-display text-3xl sm:text-4xl mb-4">{item.title}</h2>
          <p className="text-sm text-ink/70 leading-relaxed mb-5">
            {item.description}
          </p>
          <div className="label-mono text-ink/40 text-xs">
            {item.tags.join(" · ")}
          </div>
        </div>
        <div className="lg:col-span-5 mt-6 lg:mt-0">
          <div className="grid grid-cols-2 gap-2">
            {[
              { v: "0", l: "DATABASES" },
              { v: "8", l: "MARKDOWN POSTS" },
              { v: "100", l: "REACT COMPONENTS" },
              { v: "24/7", l: "ON GITHUB PAGES" },
            ].map((s) => (
              <div key={s.l} className="border border-ink/20 p-4">
                <div className="head-display text-2xl">{s.v}</div>
                <div className="label-mono text-ink/40 text-[0.55rem] mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
          <ProjectLink item={item} />
        </div>
      </div>
    </div>
  );
}

export const SHOWCASES = {
  pivot: KanbanShowcase,
  "career-ops": PipelineShowcase,
  "tableau-dashboards": ChartShowcase,
  "process-mapping": ProcessShowcase,
  "research-practice": ResearchShowcase,
  monolith: TerminalShowcase,
};
