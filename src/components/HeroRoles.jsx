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

function ResearcherIcon({ active, reduced }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 shrink-0"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3z" />
      <path d="M6 11.5a6 6 0 0 1 11.93 0" />
      <circle cx="12" cy="16" r="2" />
      <line x1="12" y1="16" x2="12" y2="12" />
      {!reduced && active && (
        <g stroke="currentColor" strokeWidth="1">
          <path
            d="M9 16a3 3 0 0 1 6 0"
            opacity="0.5"
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0 6;6 0"
              dur="2s"
              fill="freeze"
              repeatCount="1"
            />
          </path>
        </g>
      )}
    </svg>
  );
}

function AnalystIcon({ active, reduced }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 shrink-0"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="17" x2="21" y2="17" />
      <polyline points="5 13 12 6 19 13" />
      {!reduced && active && (
        <line
          x1="5"
          y1="13"
          x2="5"
          y2="9"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        >
          <animate
            attributeName="opacity"
            values="0;1;0.4"
            dur="1.5s"
            fill="freeze"
            repeatCount="1"
          />
        </line>
      )}
    </svg>
  );
}

function DesignerIcon({ active, reduced }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 shrink-0"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.35 6.95a4.02 4.02 0 0 0-1.92-2.34A4 4 0 0 0 12 4 4 4 0 0 0 5.57 4.6a4 4 0 0 0-1.92 2.34 4 4 0 0 0-.15 1.95v3.28a3.93 3.93 0 0 0 1.06 2.7l.86.86a1 1 0 0 1 .34.76v3.28a4 4 0 1 0 2 0v-3.28a1 1 0 0 1 .34-.76l.86-.86a3.93 3.93 0 0 0 1.06-2.7V8.9a4 4 0 0 0-.15-1.95z" />
      <circle cx="12" cy="12" r="3" />
      {!reduced && active && (
        <circle
          cx="12"
          cy="12"
          r="0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <animate
            attributeName="r"
            values="0;3"
            dur="1s"
            fill="freeze"
            repeatCount="1"
          />
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            fill="freeze"
            repeatCount="1"
          />
        </circle>
      )}
    </svg>
  );
}

const ICONS = {
  RESEARCHER: ResearcherIcon,
  ANALYST: AnalystIcon,
  DESIGNER: DesignerIcon,
};

export default function HeroRoles({ active, onSelect }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {ROLES.map((role, i) => {
        const isActive = active === role.label;
        const Icon = ICONS[role.label];
        return (
          <button
            key={role.label}
            type="button"
            aria-pressed={isActive}
            onMouseEnter={() => onSelect(i)}
            onClick={() => onSelect(i)}
            className={`role-chip flex items-center gap-1.5 px-4 py-2 label-mono text-xs font-medium transition-all duration-300 border rounded-none ${
              isActive
                ? "bg-ink text-base"
                : "bg-transparent text-ink/40 hover:text-ink/70 hover:bg-ink/5"
            }`}
            style={isActive ? { backgroundColor: role.accent, color: "var(--color-base)" } : {}}
          >
            <Icon active={isActive} reduced={reduced} />
            {role.label}
          </button>
        );
      })}
    </div>
  );
}