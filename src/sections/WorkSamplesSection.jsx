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
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-md border border-border bg-card p-2">
            <div className="h-1.5 w-8 bg-border-strong mb-1" />
            <div className="h-4 bg-ink/80" />
            <div className="h-1.5 w-6 bg-accent/60 mt-1" />
          </div>
          <div className="rounded-md border border-border bg-card p-2">
            <div className="h-1.5 w-8 bg-border-strong mb-1" />
            <div className="h-4 bg-ink/80" />
            <div className="h-1.5 w-8 bg-soft/60 mt-1" />
          </div>
          <div className="rounded-md border border-border bg-card p-2">
            <div className="h-1.5 w-8 bg-border-strong mb-1" />
            <div className="h-4 bg-ink/80" />
            <div className="h-1.5 w-7 bg-soft/60 mt-1" />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2 rounded-md border border-border bg-card p-3">
          <div className="h-1.5 w-16 bg-border-strong mb-0.5" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-2 bg-border-strong/70" />
            <div className="flex-1 h-2 rounded-full bg-soft/30">
              <div className="h-full rounded-full bg-accent/80" style={{ width: "100%" }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-2 bg-border-strong/50" />
            <div className="flex-1 h-2 rounded-full bg-soft/30">
              <div className="h-full rounded-full bg-accent/60" style={{ width: "72%" }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-2 bg-border-strong/50" />
            <div className="flex-1 h-2 rounded-full bg-soft/30">
              <div className="h-full rounded-full bg-accent/50" style={{ width: "55%" }} />
            </div>
          </div>
        </div>
        <div className="rounded-md border border-border bg-card p-2">
          <div className="h-1.5 w-12 bg-border-strong mb-1" />
          <svg viewBox="0 0 200 40" className="w-full h-8" fill="none">
            <line x1="0" y1="8" x2="200" y2="8" stroke="#8c8a82" strokeWidth="1" strokeDasharray="4 3" />
            <polyline
              points="0,32 40,26 80,28 120,20 160,16 200,11"
              stroke="#F4B400"
              strokeWidth="2"
            />
          </svg>
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
  if (type === "Stock table") {
    return (
      <svg viewBox="0 0 320 240" className="w-full h-full max-w-xs" fill="none">
        <rect x="16" y="10" width="288" height="30" rx="3" fill="#ffffff" stroke="#d4d0c4" strokeWidth="1" />
        <rect x="22" y="19" width="64" height="4" rx="2" fill="#d4d0c4" />
        <rect x="22" y="26" width="84" height="4" rx="2" fill="#5c594f" />
        <text x="180" y="29" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#4a3c00" fontWeight="600">IN ৳840K</text>
        <text x="262" y="29" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#8c8a82">OUT ৳520K</text>
        <rect x="238" y="48" width="66" height="14" rx="7" fill="#F4B400" />
        <text x="271" y="58" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="#4a3c00" fontWeight="600">LOW STOCK</text>
        <rect x="16" y="50" width="288" height="20" rx="3" fill="#f3f1ea" stroke="#d4d0c4" strokeWidth="1" />
        <text x="24" y="63" fontFamily="Inter, sans-serif" fontSize="8" fill="#5c594f" fontWeight="600">SKU</text>
        <text x="88" y="63" fontFamily="Inter, sans-serif" fontSize="8" fill="#5c594f" fontWeight="600">ITEM</text>
        <text x="186" y="63" fontFamily="Inter, sans-serif" fontSize="8" fill="#5c594f" fontWeight="600">STOCK</text>
        <text x="240" y="63" fontFamily="Inter, sans-serif" fontSize="8" fill="#5c594f" fontWeight="600">PRICE</text>
        {[
          ["QK65", "Keyboard", "42", "৳18,500"],
          ["PC-01", "PCB kit", "120", "৳4,200"],
          ["SW-01", "Switches", "8", "৳950"],
          ["DM-00", "Deskmat", "64", "৳2,100"],
          ["CV-01", "Dust cover", "37", "৳750"],
        ].map((row, i) => {
          const y = 74 + i * 26;
          const low = row[2] === "8";
          return (
            <g key={row[0]}>
              <rect
                x="16"
                y={y}
                width="288"
                height="22"
                rx="3"
                fill={low ? "#fff7d6" : "#ffffff"}
                stroke={low ? "#F4B400" : "#e2dfd5"}
                strokeWidth="1"
              />
              <text x="24" y={y + 14} fontFamily="JetBrains Mono, monospace" fontSize="8" fill={low ? "#4a3c00" : "#8c8a82"}>{row[0]}</text>
              <text x="88" y={y + 14} fontFamily="Inter, sans-serif" fontSize="8" fill="#5c594f">{row[1]}</text>
              <text x="186" y={y + 14} fontFamily="JetBrains Mono, monospace" fontSize="8" fill={low ? "#4a3c00" : "#5c594f"}>{row[2]}</text>
              <text x="240" y={y + 14} fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#5c594f">{row[3]}</text>
            </g>
          );
        })}
      </svg>
    );
  }
  if (type === "Brief framework") {
    return (
      <svg viewBox="0 0 320 240" className="w-full h-full max-w-xs" fill="none">
        <rect x="16" y="16" width="132" height="120" rx="3" fill="#ffffff" stroke="#d4d0c4" strokeWidth="1" />
        <rect x="24" y="26" width="44" height="8" rx="2" fill="#d4d0c4" />
        <text x="24" y="46" fontFamily="Inter, sans-serif" fontSize="8" fill="#a09c90">"Analyse the impact of</text>
        <text x="24" y="57" fontFamily="Inter, sans-serif" fontSize="8" fill="#a09c90">cloud computing on</text>
        <text x="24" y="68" fontFamily="Inter, sans-serif" fontSize="8" fill="#a09c90">SMEs in the UK..."</text>
        <rect x="24" y="84" width="92" height="3" rx="1.5" fill="#e8e5dc" />
        <rect x="24" y="92" width="76" height="3" rx="1.5" fill="#e8e5dc" />
        <text x="24" y="122" fontFamily="Inter, sans-serif" fontSize="7" fill="#8c8a82" fontStyle="italic">raw brief from the client</text>
        <line x1="152" y1="76" x2="166" y2="76" stroke="#F4B400" strokeWidth="2" />
        <polygon points="168,76 158,70 158,82" fill="#F4B400" />
        <rect x="172" y="16" width="132" height="120" rx="3" fill="#ffffff" stroke="#F4B400" strokeWidth="1" />
        <text x="180" y="30" fontFamily="Inter, sans-serif" fontSize="8" fill="#4a3c00" fontWeight="600">SCOPED</text>
        {[
          ["Topic", "Cloud → SME strategy"],
          ["Words", "2,500"],
          ["Referencing", "Harvard"],
          ["Deadline", "10 days"],
          ["Deliverable", "Essay + plan"],
        ].map((r, i) => {
          const y = 44 + i * 17;
          return (
            <g key={r[0]}>
              <polygon points={`184,${y + 3} 188,${y + 7} 194,${y + 0}`} fill="#F4B400" />
              <text x="200" y={y + 8} fontFamily="Inter, sans-serif" fontSize="7" fill="#8c8a82">{r[0]}</text>
              <text x="242" y={y + 8} fontFamily="Inter, sans-serif" fontSize="7" fill="#5c594f">{r[1]}</text>
            </g>
          );
        })}
      </svg>
    );
  }
  if (type === "Process docs") {
    return (
      <svg viewBox="0 0 320 240" className="w-full h-full max-w-xs" fill="none">
        <rect x="40" y="16" width="240" height="208" rx="4" fill="#ffffff" stroke="#d4d0c4" strokeWidth="1" />
        <rect x="40" y="16" width="240" height="28" rx="4" fill="#f3f1ea" />
        <rect x="48" y="24" width="90" height="6" rx="3" fill="#5c594f" />
        <text x="240" y="35" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#8c8a82">SOP-03 · v2</text>
        {[0, 1, 2, 3].map((i) => {
          const y = 62 + i * 38;
          return (
            <g key={i}>
              <circle cx="58" cy={y + 6} r="7" fill="#fff7d6" stroke="#F4B400" strokeWidth="1" />
              <text x="58" y={y + 9} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="#4a3c00" fontWeight="600">{i + 1}</text>
              <rect x="76" y={y} width="110" height="5" rx="2.5" fill="#d4d0c4" />
              <rect x="76" y={y + 9} width="84" height="5" rx="2.5" fill="#e8e5dc" />
              <text x="196" y={y + 9} fontFamily="Inter, sans-serif" fontSize="7" fill="#8c8a82">→ FLEXCUBE</text>
            </g>
          );
        })}
        <polygon points="110,196 120,206 110,216 100,206" fill="#fff7d6" stroke="#F4B400" strokeWidth="1" />
        <text x="110" y="209" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="#4a3c00">ok?</text>
        <rect x="196" y="184" width="70" height="18" rx="3" fill="#ffffff" stroke="#8c8a82" strokeWidth="1" strokeDasharray="3 2" />
        <text x="231" y="196" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#8c8a82">REVIEWED</text>
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
        number="03"
        title="Work samples."
        description="Real output from the kind of work I do — dashboards, process maps, stock systems, and the documents that keep an operation honest. Each card is a stylized demo of the actual thing."
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
