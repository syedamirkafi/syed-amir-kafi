import { metrics } from "../data/metrics.js";

export default function MetricsBand() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-2 border-ink divide-x divide-y sm:divide-y-0 divide-ink/20">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="p-6 flex flex-col justify-between min-h-[140px]"
          style={{ backgroundColor: "var(--color-base)" }}
        >
          <span className="label-mono text-ink/40 text-[0.6rem]">
            ● RECORDED
          </span>
          <div>
            <div
              className="head-display text-4xl sm:text-5xl"
              style={{ color: m.color }}
            >
              {m.value}
            </div>
            <div className="label-mono text-ink/60 text-[0.6rem] mt-2 leading-relaxed">
              {m.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
