import { useCountUp } from "../lib/useCountUp.js";
import { withBase } from "../lib/base.js";

function StatusBadge({ status }) {
  const inProgress = status === "in-progress";
  return (
    <span
      className={`label-mono text-[0.6rem] px-2.5 py-1 rounded-full border ${
        inProgress
          ? "border-accent bg-accent/10 text-accent-ink"
          : "border-emerald-700/40 bg-emerald-700/10 text-emerald-800"
      }`}
    >
      {inProgress ? "● In progress" : "✓ Shipped"}
    </span>
  );
}

function ProjectLink({ item }) {
  if (item.github) {
    return (
      <a
        href={item.github}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-block label-mono text-sm font-semibold text-ink hover:text-accent-ink transition-colors"
      >
        View on GitHub ↗
      </a>
    );
  }
  if (item.caseStudy) {
    return (
      <a
        href={withBase(item.caseStudy)}
        className="mt-6 inline-block label-mono text-sm font-semibold text-ink hover:text-accent-ink transition-colors"
      >
        Read case study →
      </a>
    );
  }
  return null;
}

function InfoPanel({ item, summary }) {
  return (
    <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
      <div className="flex items-center gap-3 mb-4">
        <StatusBadge status={item.status} />
        <span
          className="label-mono text-[0.6rem] px-2 py-1 text-base rounded-full border border-border-strong"
        >
          {item.tag}
        </span>
      </div>
      <h2 className="head-display text-2xl sm:text-3xl text-ink mb-3">
        {item.title}
      </h2>
      <p className="text-sm text-soft leading-relaxed mb-5">{summary}</p>
      <div className="label-mono text-muted text-[0.65rem]">
        {item.tags.join(" · ")}
      </div>
      <ProjectLink item={item} />
    </div>
  );
}

export function KanbanShowcase({ item }) {
  const nav = [
    { k: "DB", label: "Dashboard" },
    { k: "BR", label: "Browser" },
    { k: "JA", label: "Job Analyzer" },
    { k: "SJ", label: "Saved Jobs", active: true },
    { k: "AB", label: "Ask Bro" },
    { k: "DC", label: "Documents" },
    { k: "CA", label: "Calendar" },
  ];
  const lanes = [
    { name: "DRAFT", count: 2 },
    { name: "APPLIED", count: 3 },
    { name: "INTERVIEW", count: 2 },
    { name: "OFFER", count: 1 },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 module-shift overflow-hidden rounded-2xl border border-border bg-card">
      <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 relative flex items-center justify-center min-h-[320px] border-b lg:border-b-0 lg:border-r border-border">
        <div className="relative w-full max-w-[560px] rounded-xl overflow-hidden border border-border bg-base">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
            <span className="w-2 h-2 rounded-full bg-border-strong" />
            <span className="w-2 h-2 rounded-full bg-border-strong" />
            <span className="w-2 h-2 rounded-full bg-border-strong" />
            <span className="ml-2 label-mono text-muted text-[0.55rem] tracking-[0.18em]">
              Pivot — Saved Jobs
            </span>
          </div>
          <div className="flex">
            <nav className="w-32 shrink-0 border-r border-border p-2 hidden sm:block">
              <div className="px-1 py-2 flex items-center gap-1.5 border-b border-border mb-2">
                <span className="mono text-accent-ink text-[0.6rem] font-bold tracking-tight">
                  PIVOT
                </span>
                <span className="label-mono text-muted text-[0.45rem]">v1</span>
              </div>
              <div className="space-y-1">
                {nav.map((n) => (
                  <div
                    key={n.label}
                    className={`flex items-center gap-2 rounded-md px-1.5 py-1 ${
                      n.active ? "bg-accent/15" : ""
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-[5px] flex items-center justify-center text-[0.5rem] font-bold ${
                        n.active
                          ? "bg-accent text-accent-ink"
                          : "bg-card border border-border text-muted"
                      }`}
                    >
                      {n.k}
                    </span>
                    <span className="text-[0.55rem] tracking-wider uppercase text-soft">
                      {n.label}
                    </span>
                  </div>
                ))}
              </div>
            </nav>
            <div className="flex-1 min-w-0 bg-card">
              <div className="px-3 py-2.5 border-b border-border flex items-center justify-between">
                <span className="label-mono text-ink/80 text-[0.6rem]">
                  Saved Jobs
                </span>
                <span className="text-[0.5rem] px-1.5 py-0.5 rounded-full bg-base border border-border text-muted">
                  7 apps
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 p-2">
                {lanes.map((lane) => (
                  <div key={lane.name} className="rounded-md border border-border bg-base p-1.5">
                    <div className="flex items-center gap-1 mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-[0.5rem] font-semibold tracking-wider text-soft">
                        {lane.name}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {Array.from({ length: lane.count }).map((_, idx) => (
                        <div
                          key={idx}
                          className="rounded-md border border-border bg-card p-1.5"
                        >
                          <div className="h-1.5 w-full bg-border-strong rounded-sm" />
                          <div className="h-1 w-2/3 bg-border rounded-sm mt-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-3 py-2 border-t border-border flex items-center justify-between">
                <span className="text-[0.5rem] tracking-widest text-accent-ink">
                  ● Requirements defined
                </span>
                <span className="label-mono text-muted text-[0.5rem]">
                  Criteria weighted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-5">
        <InfoPanel item={item} summary={item.solution} />
      </div>
    </div>
  );
}

export function ResearchShowcase({ item }) {
  const [clients, clientsRef] = useCountUp(80, { duration: 1500 });
  const sheets = [
    "Business Process Analysis",
    "IT Strategy Brief",
    "Market Research",
    "Data Summary",
    "Feasibility Study",
    "Client Report",
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 module-shift overflow-hidden rounded-2xl border border-border bg-card">
      <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 relative overflow-hidden flex items-center justify-center min-h-[320px] border-b lg:border-b-0 lg:border-r border-border">
        <div className="relative w-full max-w-[560px] flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          <div className="relative h-60 w-72 sm:w-80 shrink-0">
            {sheets.map((s, i) => {
              return (
                <div
                  key={s}
                  className="sk-paper absolute inset-0 rounded-[2px] p-4"
                  style={{
                    transform: `translateY(${
                      (sheets.length - 1 - i) * 9
                    }px) rotate(${(i - (sheets.length - 1) / 2) * 3}deg)`,
                    zIndex: i,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="sk-paper-line h-2 w-16" />
                    <div className="sk-paper-line h-2 w-8 opacity-60" />
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="sk-paper-line h-1.5 w-full" />
                    <div className="sk-paper-line h-1.5 w-4/5" />
                    <div className="sk-paper-line h-1.5 w-3/5" />
                    <div className="sk-paper-line h-1.5 w-2/3" />
                  </div>
                  <div className="mt-5">
                    <div className="text-[0.8rem] font-bold tracking-tight text-slate-800">
                      {s}
                    </div>
                    <div className="sk-paper-line h-[2px] w-20 mt-1" style={{ backgroundColor: "#F4B400", opacity: 0.6 }} />
                    <div className="mt-1.5 text-[0.6rem] font-medium text-slate-500">
                      Prepared for University Client · {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute right-3 bottom-3 sk-stamp rounded-sm px-1.5 py-1 text-[0.55rem] font-bold tracking-[0.2em] rotate-[-12deg] opacity-90">
                      APPROVED
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="rounded-xl border border-border bg-base px-6 py-5 text-center shrink-0">
            <div
              className="serif text-5xl sm:text-6xl text-accent-ink tabular-nums"
              ref={clientsRef}
            >
              {clients}+
            </div>
            <div className="label-mono text-soft text-[0.6rem] mt-2">
              University Clients Served
            </div>
            <div className="label-mono text-muted text-[0.55rem] mt-1">
              Business · IT · Remote
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-5">
        <InfoPanel item={item} summary={item.solution} />
      </div>
    </div>
  );
}

export const SHOWCASES = {
  pivot: KanbanShowcase,
  "research-practice": ResearchShowcase,
};
