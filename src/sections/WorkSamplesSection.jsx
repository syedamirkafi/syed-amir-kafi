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
        className="w-full aspect-[4/3] object-cover border-b border-border transition-transform duration-500 group-hover:scale-[1.02]"
      />
    );
  }
  return (
    <div className="w-full aspect-[4/3] border-b border-border bg-base flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-[1.02]">
      <SamplePlaceholder type={item.type} />
    </div>
  );
}

function SamplePlaceholder({ type }) {
  if (type === "Dashboard") {
    return (
      <svg viewBox="0 0 320 240" className="w-full h-full max-w-xs" fill="none">
        <rect x="16" y="10" width="288" height="26" rx="3" fill="var(--color-panel)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <circle cx="28" cy="23" r="4" fill="var(--color-accent)" />
        <text x="40" y="27" fontFamily="Inter, sans-serif" fontSize="9" fill="var(--color-soft)" fontWeight="600">
          Rep scorecards
        </text>
        <text x="280" y="27" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--color-muted)">
          WK 12
        </text>

        <rect x="16" y="44" width="90" height="40" rx="3" fill="var(--color-card)" stroke="var(--color-line-soft)" strokeWidth="1" />
        <text x="24" y="58" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--color-soft)" fontWeight="600">
          101%
        </text>
        <text x="24" y="68" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          target met
        </text>
        <rect x="24" y="74" width="40" height="3" rx="1.5" fill="var(--color-accent)" />

        <rect x="115" y="44" width="90" height="40" rx="3" fill="var(--color-card)" stroke="var(--color-line-soft)" strokeWidth="1" />
        <text x="123" y="58" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--color-soft)" fontWeight="600">
          14
        </text>
        <text x="123" y="68" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          of 15 routes
        </text>

        <rect x="214" y="44" width="90" height="40" rx="3" fill="var(--color-card)" stroke="var(--color-line-soft)" strokeWidth="1" />
        <text x="222" y="58" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--color-soft)" fontWeight="600">
          +18%
        </text>
        <text x="222" y="68" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          vs last season
        </text>

        <rect x="16" y="92" width="288" height="62" rx="3" fill="var(--color-card)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <text x="24" y="106" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-soft)" fontWeight="600">
          Route ranking
        </text>
        {[
          ["R-07", 92],
          ["R-02", 71],
          ["R-11", 55],
        ].map((r, i) => {
          const y = 116 + i * 14;
          return (
            <g key={r[0]}>
              <text x="24" y={y + 5} fontFamily="JetBrains Mono, monospace" fontSize="7" fill="var(--color-muted)">
                {r[0]}
              </text>
              <rect x="54" y={y - 1} width="180" height="8" rx="4" fill="var(--color-panel)" />
              <rect x="54" y={y - 1} width={(180 * r[1]) / 100} height="8" rx="4" fill="var(--color-accent)" />
              <text x="242" y={y + 5} fontFamily="JetBrains Mono, monospace" fontSize="7" fill="var(--color-soft)">
                {r[1]}%
              </text>
            </g>
          );
        })}

        <rect x="16" y="162" width="288" height="62" rx="3" fill="var(--color-card)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <text x="24" y="176" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-soft)" fontWeight="600">
          Sales trend vs target
        </text>
        <line x1="24" y1="200" x2="296" y2="200" stroke="var(--color-muted)" strokeWidth="1" strokeDasharray="4 3" />
        <text x="236" y="196" fontFamily="Inter, sans-serif" fontSize="6" fill="var(--color-muted)">
          target
        </text>
        <line x1="24" y1="216" x2="296" y2="216" stroke="var(--color-line-soft)" strokeWidth="1" />
        <polyline
          points="24,216 68,208 112,212 156,196 200,188 244,180 296,172"
          stroke="var(--color-accent)"
          strokeWidth="2"
        />
        <text x="24" y="222" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="var(--color-muted)">
          W1
        </text>
        <text x="152" y="222" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="var(--color-muted)">
          W6
        </text>
        <text x="296" y="222" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="var(--color-muted)">
          W12
        </text>
      </svg>
    );
  }
  if (type === "Process map") {
    return (
      <svg viewBox="0 0 320 240" className="w-full h-full max-w-xs" fill="none">
        <rect x="16" y="10" width="288" height="26" rx="3" fill="var(--color-panel)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <circle cx="28" cy="23" r="4" fill="var(--color-accent)" />
        <text x="40" y="27" fontFamily="Inter, sans-serif" fontSize="9" fill="var(--color-soft)" fontWeight="600">
          Order picking · BPMN
        </text>
        <text x="280" y="27" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--color-muted)">
          AS-IS
        </text>

        <rect x="16" y="44" width="288" height="74" rx="3" fill="var(--color-card)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <text x="24" y="58" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)" fontWeight="600">
          WAREHOUSE
        </text>
        <circle cx="40" cy="98" r="8" fill="var(--color-accent)" />
        <text x="40" y="101" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="var(--color-accent-ink)" fontWeight="600">
          S
        </text>
        <rect x="60" y="84" width="66" height="28" rx="3" fill="var(--color-card)" stroke="var(--color-soft)" strokeWidth="1" />
        <text x="93" y="101" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-soft)">
          Pick
        </text>
        <line x1="128" y1="98" x2="150" y2="98" stroke="var(--color-muted)" strokeWidth="1" />
        <polygon points="150,98 142,94 142,102" fill="var(--color-muted)" />
        <rect x="152" y="84" width="66" height="28" rx="3" fill="var(--color-card)" stroke="var(--color-soft)" strokeWidth="1" />
        <text x="185" y="101" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-soft)">
          Stage
        </text>
        <line x1="220" y1="98" x2="240" y2="98" stroke="var(--color-muted)" strokeWidth="1" />
        <polygon points="240,98 232,94 232,102" fill="var(--color-muted)" />
        <rect x="242" y="84" width="54" height="28" rx="3" fill="var(--color-goldtint)" stroke="var(--color-accent)" strokeWidth="1" />
        <text x="269" y="101" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-goldtext)">
          Recheck
        </text>
        <line x1="248" y1="89" x2="290" y2="107" stroke="var(--color-accent)" strokeWidth="1.5" />
        <line x1="290" y1="89" x2="248" y2="107" stroke="var(--color-accent)" strokeWidth="1.5" />

        <line x1="185" y1="118" x2="185" y2="130" stroke="var(--color-muted)" strokeWidth="1" strokeDasharray="3 3" />
        <polygon points="185,130 181,122 189,122" fill="var(--color-muted)" />

        <rect x="16" y="130" width="288" height="74" rx="3" fill="var(--color-card)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <text x="24" y="144" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)" fontWeight="600">
          LOGISTICS
        </text>
        <polygon points="40,184 56,168 72,184 56,200" fill="var(--color-goldtint)" stroke="var(--color-accent)" strokeWidth="1" />
        <text x="56" y="187" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="var(--color-goldtext)" fontWeight="600">
          ok?
        </text>
        <line x1="72" y1="184" x2="88" y2="184" stroke="var(--color-muted)" strokeWidth="1" />
        <polygon points="88,184 80,180 80,188" fill="var(--color-muted)" />
        <rect x="90" y="170" width="66" height="28" rx="3" fill="var(--color-card)" stroke="var(--color-soft)" strokeWidth="1" />
        <text x="123" y="187" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-soft)">
          Dispatch
        </text>
        <line x1="158" y1="184" x2="176" y2="184" stroke="var(--color-muted)" strokeWidth="1" />
        <polygon points="176,184 168,180 168,188" fill="var(--color-muted)" />
        <rect x="178" y="170" width="54" height="28" rx="3" fill="var(--color-goldtint)" stroke="var(--color-accent)" strokeWidth="1" />
        <text x="205" y="187" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-goldtext)">
          Handoff
        </text>
        <line x1="184" y1="175" x2="226" y2="193" stroke="var(--color-accent)" strokeWidth="1.5" />
        <line x1="226" y1="175" x2="184" y2="193" stroke="var(--color-accent)" strokeWidth="1.5" />
        <line x1="234" y1="184" x2="248" y2="184" stroke="var(--color-muted)" strokeWidth="1" />
        <polygon points="248,184 240,180 240,188" fill="var(--color-muted)" />
        <rect x="250" y="170" width="46" height="28" rx="14" fill="var(--color-accent)" />
        <text x="273" y="187" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-accent-ink)" fontWeight="600">
          End
        </text>

        <rect x="16" y="212" width="288" height="18" rx="9" fill="var(--color-goldtint)" />
        <text x="160" y="224" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-goldtext)" fontWeight="600">
          2 redundant steps removed
        </text>
      </svg>
    );
  }
  if (type === "Stock table") {
    return (
      <svg viewBox="0 0 320 240" className="w-full h-full max-w-xs" fill="none">
        <rect x="16" y="10" width="288" height="26" rx="3" fill="var(--color-panel)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <circle cx="28" cy="23" r="4" fill="var(--color-accent)" />
        <text x="40" y="27" fontFamily="Inter, sans-serif" fontSize="9" fill="var(--color-soft)" fontWeight="600">
          Stock & pricing
        </text>
        <text x="280" y="27" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--color-muted)">
          KEYB IMPORTS
        </text>

        <rect x="16" y="44" width="90" height="40" rx="3" fill="var(--color-card)" stroke="var(--color-line-soft)" strokeWidth="1" />
        <text x="24" y="58" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--color-soft)" fontWeight="600">
          ৳2.1M
        </text>
        <text x="24" y="68" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          stock on hand
        </text>
        <rect x="24" y="74" width="40" height="3" rx="1.5" fill="var(--color-accent)" />

        <rect x="115" y="44" width="90" height="40" rx="3" fill="var(--color-card)" stroke="var(--color-line-soft)" strokeWidth="1" />
        <text x="123" y="58" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--color-soft)" fontWeight="600">
          8 SKUs
        </text>
        <text x="123" y="68" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          tracked live
        </text>

        <rect x="214" y="44" width="90" height="40" rx="3" fill="var(--color-goldtint)" stroke="var(--color-accent)" strokeWidth="1" />
        <text x="222" y="58" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--color-goldtext)" fontWeight="600">
          1 low
        </text>
        <text x="222" y="68" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-goldtext)">
          stock flag
        </text>

        <rect x="16" y="92" width="288" height="84" rx="3" fill="var(--color-card)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <text x="24" y="106" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-soft)" fontWeight="600">
          Stock by SKU
        </text>
        <text x="24" y="122" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          SKU
        </text>
        <text x="86" y="122" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          ITEM
        </text>
        <text x="186" y="122" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          STOCK
        </text>
        <text x="240" y="122" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          PRICE
        </text>
        {[
          ["QK65", "Keyboard", "42", "৳18,500"],
          ["SW-01", "Switches", "8", "৳950"],
          ["DM-00", "Deskmat", "64", "৳2,100"],
          ["CV-01", "Dust cover", "37", "৳750"],
        ].map((row, i) => {
          const y = 128 + i * 11;
          const low = row[0] === "SW-01";
          return (
            <g key={row[0]}>
              <rect x="16" y={y - 1} width="288" height="9" rx="2" fill={low ? "var(--color-goldtint)" : "var(--color-card)"} />
              <text x="24" y={y + 5} fontFamily="JetBrains Mono, monospace" fontSize="7" fill={low ? "var(--color-goldtext)" : "var(--color-muted)"}>{row[0]}</text>
              <text x="86" y={y + 5} fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-soft)">{row[1]}</text>
              <text x="186" y={y + 5} fontFamily="JetBrains Mono, monospace" fontSize="7" fill={low ? "var(--color-goldtext)" : "var(--color-soft)"}>{row[2]}</text>
              <text x="240" y={y + 5} fontFamily="JetBrains Mono, monospace" fontSize="7" fill="var(--color-soft)">{row[3]}</text>
            </g>
          );
        })}

        <rect x="16" y="184" width="288" height="44" rx="3" fill="var(--color-card)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <text x="24" y="198" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-soft)" fontWeight="600">
          Money in vs out
        </text>
        <text x="24" y="213" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          IN
        </text>
        <rect x="54" y="208" width="150" height="6" rx="3" fill="var(--color-panel)" />
        <rect x="54" y="208" width="112" height="6" rx="3" fill="var(--color-accent)" />
        <text x="212" y="213" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="var(--color-soft)">
          ৳840K
        </text>
        <text x="24" y="225" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          OUT
        </text>
        <rect x="54" y="220" width="150" height="6" rx="3" fill="var(--color-panel)" />
        <rect x="54" y="220" width="80" height="6" rx="3" fill="var(--color-border-strong)" />
        <text x="212" y="225" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="var(--color-soft)">
          ৳520K
        </text>
      </svg>
    );
  }
  if (type === "Brief framework") {
    return (
      <svg viewBox="0 0 320 240" className="w-full h-full max-w-xs" fill="none">
        <rect x="16" y="10" width="288" height="26" rx="3" fill="var(--color-panel)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <circle cx="28" cy="23" r="4" fill="var(--color-accent)" />
        <text x="40" y="27" fontFamily="Inter, sans-serif" fontSize="9" fill="var(--color-soft)" fontWeight="600">
          Brief breakdown
        </text>
        <text x="280" y="27" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--color-muted)">
          80+ CLIENTS
        </text>

        <rect x="16" y="44" width="136" height="124" rx="3" fill="var(--color-card)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <rect x="24" y="52" width="52" height="14" rx="7" fill="var(--color-panel)" />
        <text x="50" y="61" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="var(--color-muted)" fontWeight="600">
          RAW BRIEF
        </text>
        <text x="24" y="78" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-muted)" fontStyle="italic">
          "Analyse the impact
        </text>
        <text x="24" y="89" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-muted)" fontStyle="italic">
          of cloud computing on
        </text>
        <text x="24" y="100" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-muted)" fontStyle="italic">
          SMEs in the UK..."
        </text>
        <rect x="24" y="112" width="92" height="3" rx="1.5" fill="var(--color-line-soft)" />
        <rect x="24" y="120" width="76" height="3" rx="1.5" fill="var(--color-line-soft)" />
        <text x="24" y="152" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)" fontStyle="italic">
          as the client sent it
        </text>

        <line x1="156" y1="106" x2="164" y2="106" stroke="var(--color-accent)" strokeWidth="2" />
        <polygon points="166,106 156,100 156,112" fill="var(--color-accent)" />

        <rect x="168" y="44" width="136" height="124" rx="3" fill="var(--color-card)" stroke="var(--color-accent)" strokeWidth="1" />
        <rect x="176" y="52" width="66" height="14" rx="7" fill="var(--color-accent)" />
        <text x="209" y="61" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="var(--color-accent-ink)" fontWeight="600">
          AGREED SCOPE
        </text>
        {[
          ["Topic", "Cloud & SMEs"],
          ["Words", "2,500"],
          ["Referencing", "Harvard"],
          ["Deadline", "10 days"],
          ["Deliverable", "Essay + plan"],
        ].map((r, i) => {
          const y = 74 + i * 17;
          return (
            <g key={r[0]}>
              <polygon points={`178,${y + 3} 182,${y + 7} 188,${y + 0}`} fill="var(--color-accent)" />
              <text x="194" y={y + 8} fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">{r[0]}</text>
              <text x="238" y={y + 8} fontFamily="JetBrains Mono, monospace" fontSize="7" fill="var(--color-soft)">{r[1]}</text>
            </g>
          );
        })}

        <rect x="16" y="176" width="288" height="42" rx="3" fill="var(--color-goldtint)" />
        <text x="160" y="192" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-goldtext)" fontWeight="600">
          80+ assignments scoped on one skeleton
        </text>
        <text x="160" y="206" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          topic · words · referencing · deadline · deliverable
        </text>
      </svg>
    );
  }
  if (type === "Process docs") {
    return (
      <svg viewBox="0 0 320 240" className="w-full h-full max-w-xs" fill="none">
        <rect x="16" y="10" width="288" height="26" rx="3" fill="var(--color-panel)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <circle cx="28" cy="23" r="4" fill="var(--color-accent)" />
        <text x="40" y="27" fontFamily="Inter, sans-serif" fontSize="9" fill="var(--color-soft)" fontWeight="600">
          Branch SOP
        </text>
        <text x="280" y="27" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="var(--color-muted)">
          SOP-03 · v2
        </text>

        <rect x="16" y="44" width="288" height="162" rx="3" fill="var(--color-card)" stroke="var(--color-border-strong)" strokeWidth="1" />
        <text x="24" y="60" fontFamily="Inter, sans-serif" fontSize="8" fill="var(--color-soft)" fontWeight="600">
          Account opening
        </text>
        <rect x="270" y="50" width="26" height="13" rx="6.5" fill="var(--color-accent)" />
        <text x="283" y="59" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="6" fill="var(--color-accent-ink)" fontWeight="600">
          LIVE
        </text>
        {[
          ["Collect KYC & ID copy", 0],
          ["Run eligibility check", 1],
          ["Open account in FLEXCUBE", 2],
          ["Issue cheque book & card", 3],
        ].map((step, i) => {
          const y = 78 + i * 27;
          return (
            <g key={step[1]}>
              <circle cx="30" cy={y + 6} r="7" fill="var(--color-goldtint)" stroke="var(--color-accent)" strokeWidth="1" />
              <text x="30" y={y + 9} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-goldtext)" fontWeight="600">
                {i + 1}
              </text>
              <rect x="46" y={y} width="150" height="5" rx="2.5" fill="var(--color-border-strong)" />
              <rect x="46" y={y + 9} width="118" height="5" rx="2.5" fill="var(--color-line-soft)" />
              <text x="206" y={y + 9} fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
                → FLEXCUBE
              </text>
            </g>
          );
        })}
        <text x="24" y="196" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-muted)">
          written for the reader, not the author
        </text>
        <rect x="216" y="178" width="72" height="18" rx="3" fill="var(--color-card)" stroke="var(--color-muted)" strokeWidth="1" strokeDasharray="3 2" />
        <text x="252" y="190" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="var(--color-muted)">
          REVIEWED
        </text>

        <rect x="16" y="212" width="288" height="18" rx="9" fill="var(--color-goldtint)" />
        <text x="160" y="224" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fill="var(--color-goldtext)" fontWeight="600">
          a newcomer can run the branch from the docs
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
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-border">
                  <span className="text-ink text-sm font-medium flex items-center gap-1.5">
                    <span aria-hidden="true" className="text-accent">✓</span>
                    {item.outcome}
                  </span>
                  <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-border-strong px-3 py-1 text-soft text-xs font-medium group-hover:bg-accent group-hover:border-accent group-hover:text-accent-ink transition-all">
                    Read
                    <span aria-hidden="true">→</span>
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
