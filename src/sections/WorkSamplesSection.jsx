import { workSamples } from "../data/workSamples.js";
import { withBase } from "../lib/base.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";

function SampleThumb({ item }) {
  if (item.image) {
    return (
      <img
        src={withBase(item.image)}
        alt={item.title}
        className="w-full aspect-[4/3] object-cover border-b border-border"
      />
    );
  }
  return (
    <div className="w-full aspect-[4/3] border-b border-border bg-base flex items-center justify-center p-6">
      <SamplePlaceholder type={item.type} />
    </div>
  );
}

function SamplePlaceholder({ type }) {
  if (type === "Dashboard") {
    return (
      <div className="w-full h-full flex flex-col gap-3 max-w-xs">
        <div className="flex items-center justify-between mb-1">
          <div className="h-2 w-20 bg-border-strong" />
          <div className="h-2 w-10 bg-accent/60" />
        </div>
        <div className="flex-1 grid grid-cols-3 gap-2">
          <div className="rounded-md border border-border bg-card p-2">
            <div className="h-1.5 w-10 bg-border-strong mb-1" />
            <div className="h-6 flex items-end gap-0.5">
              <div className="flex-1 bg-accent/70" style={{ height: "40%" }} />
              <div className="flex-1 bg-accent/70" style={{ height: "70%" }} />
              <div className="flex-1 bg-accent/70" style={{ height: "55%" }} />
            </div>
          </div>
          <div className="rounded-md border border-border bg-card p-2">
            <div className="h-1.5 w-10 bg-border-strong mb-1" />
            <div className="h-6 flex items-end gap-0.5">
              <div className="flex-1 bg-soft/40" style={{ height: "30%" }} />
              <div className="flex-1 bg-soft/40" style={{ height: "60%" }} />
              <div className="flex-1 bg-soft/40" style={{ height: "85%" }} />
            </div>
          </div>
          <div className="rounded-md border border-border bg-card p-2">
            <div className="h-1.5 w-10 bg-border-strong mb-1" />
            <div className="h-6 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-accent border-dashed opacity-60" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1.5 mt-1">
          <div className="h-1 bg-border-strong" />
          <div className="h-1 bg-border-strong" />
          <div className="h-1 bg-border-strong" />
          <div className="h-1 bg-border-strong" />
        </div>
      </div>
    );
  }
  if (type === "Process map") {
    return (
      <svg viewBox="0 0 320 240" className="w-full h-full max-w-xs" fill="none">
        <rect x="20" y="28" width="280" height="36" rx="3" fill="#ffffff" stroke="#d4d0c4" strokeWidth="1" />
        <text x="160" y="50" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#5c594f">
          Customer
        </text>
        <line x1="160" y1="64" x2="160" y2="88" stroke="#8c8a82" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="20" y="88" width="130" height="36" rx="3" fill="#ffffff" stroke="#d4d0c4" strokeWidth="1" />
        <text x="85" y="110" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#5c594f">
          Start
        </text>
        <rect x="170" y="88" width="130" height="36" rx="3" fill="#ffffff" stroke="#d4d0c4" strokeWidth="1" />
        <text x="235" y="110" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#5c594f">
          Verify
        </text>
        <path d="M150 106 L168 106" stroke="#8c8a82" strokeWidth="1" />
        <line x1="85" y1="124" x2="85" y2="148" stroke="#8c8a82" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="235" y1="124" x2="235" y2="148" stroke="#8c8a82" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="20" y="148" width="130" height="36" rx="3" fill="#ffffff" stroke="#d4d0c4" strokeWidth="1" />
        <text x="85" y="170" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#5c594f">
          Process
        </text>
        <polygon points="170,156 195,166 170,176 195,186 170,196" fill="#fff7d6" stroke="#F4B400" strokeWidth="1" />
        <text x="195" y="182" textAnchor="start" fontFamily="Inter, sans-serif" fontSize="9" fill="#4a3c00">
          validate
        </text>
        <line x1="85" y1="184" x2="85" y2="208" stroke="#8c8a82" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="20" y="208" width="130" height="24" rx="12" fill="#F4B400" stroke="none" />
        <text x="85" y="223" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#4a3c00" fontWeight="600">
          End
        </text>
      </svg>
    );
  }
  return null;
}

export default function WorkSamplesSection() {
  return (
    <section
      id="work-samples"
      className="px-6 max-w-4xl mx-auto scroll-mt-24 pt-32"
    >
      <SectionHeading
        kicker="Work samples"
        number="07"
        title="Work samples."
        description="Real output from the kind of work I do — dashboards and process maps, and the decision each one enabled."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {workSamples.map((item, idx) => (
          <Reveal key={item.id} delay={Math.min(idx * 60, 180)}>
            <a
              href={withBase(item.link)}
              className="group block h-full rounded-2xl overflow-hidden border border-border bg-card module-shift"
            >
              <SampleThumb item={item} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="label-mono text-accent text-[0.6rem]">
                    {item.type}
                  </span>
                  <span className="label-mono text-muted text-[0.6rem]">
                    {item.context}
                  </span>
                </div>
                <h3 className="serif text-base font-medium text-ink leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-soft text-sm leading-relaxed mb-3">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-ink text-sm font-medium">
                    {item.outcome}
                  </span>
                  <span className="text-soft group-hover:text-ink transition-colors text-sm">
                    →
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <p className="text-muted text-xs mt-6 text-center">
        Want to see the underlying files? Reach out — most can be shared as extracts.
      </p>
    </section>
  );
}
