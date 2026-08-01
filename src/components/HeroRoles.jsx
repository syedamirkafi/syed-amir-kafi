import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion.js";

const ROLES = [
  {
    label: "RESEARCHER",
    accent: "#0077B6",
    pastel: "pastel-blue",
  },
  {
    label: "ANALYST",
    accent: "#2563EB",
    pastel: "pastel-blue",
  },
  {
    label: "DESIGNER",
    accent: "#dc2626",
    pastel: "pastel-pink",
  },
];

function RadarAnimation({ reduced }) {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20" aria-hidden="true">
      <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="40" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <circle cx="40" cy="40" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="40" y1="40" x2="40" y2="10" stroke="currentColor" strokeWidth="2" opacity="0.9">
        {!reduced && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="2.4s"
            repeatCount="indefinite"
          />
        )}
      </line>
      <circle cx="40" cy="40" r="2.5" fill="currentColor" />
    </svg>
  );
}

function AnalystAnimation({ reduced }) {
  const bars = [38, 62, 48, 80, 68];
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20" aria-hidden="true">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={8 + i * 14}
          y={72 - h}
          width="9"
          height={h}
          rx="1"
          fill="currentColor"
          opacity="0.85"
        >
          {!reduced && (
            <animate
              attributeName="height"
              values={`${h * 0.3};${h};${h * 0.3}`}
              dur="2.2s"
              begin={`${i * 0.18}s`}
              repeatCount="indefinite"
            />
          )}
        </rect>
      ))}
    </svg>
  );
}

function DesignerAnimation({ reduced }) {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20" aria-hidden="true">
      <path
        d="M14 58 L40 16 L66 58"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="300"
        strokeDashoffset={reduced ? 0 : undefined}
      >
        {!reduced && (
          <animate
            attributeName="stroke-dashoffset"
            values="300;0"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </path>
      <circle cx="22" cy="56" r="3" fill="currentColor" />
      <circle cx="40" cy="56" r="3" fill="currentColor" />
      <circle cx="58" cy="56" r="3" fill="currentColor" />
    </svg>
  );
}

const ANIMATIONS = {
  RESEARCHER: RadarAnimation,
  ANALYST: AnalystAnimation,
  DESIGNER: DesignerAnimation,
};

export default function HeroRoles({ active, onSelect }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="flex-1 flex flex-col">
      {ROLES.map((role, i) => {
        const isActive = active === role.label;
        const Animation = ANIMATIONS[role.label];
        return (
          <button
            key={role.label}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(i)}
            className={`flex-1 flex items-center justify-center gap-4 border-b-2 last:border-b-0 transition-all duration-500 relative overflow-hidden ${
              isActive ? "" : "opacity-60"
            }`}
            style={{
              backgroundColor: isActive
                ? role.accent
                : "transparent",
              borderColor: "var(--color-border)",
            }}
          >
            {isActive && (
              <div
                className="absolute inset-0 pastel-blob"
                style={{ backgroundColor: `var(--color-${role.pastel})`, opacity: 0.5 }}
              />
            )}
            <span
              className={`head-display text-3xl sm:text-5xl select-none relative transition-all duration-500 ${
                isActive ? "" : "blur-[1px]"
              }`}
              style={{
                color: isActive ? "var(--color-base)" : "var(--color-base)",
                opacity: isActive ? 1 : 0.3,
              }}
            >
              {role.label}
            </span>
            <span
              className="relative transition-all duration-500"
              style={{
                color: isActive ? "var(--color-base)" : "var(--color-base)",
                opacity: isActive ? 1 : 0.25,
                filter: isActive ? "none" : "blur(1px)",
              }}
            >
              <Animation reduced={reduced} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
