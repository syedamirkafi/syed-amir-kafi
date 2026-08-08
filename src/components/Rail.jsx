import { useLocation, useNavigate } from "react-router";
import { NAV_SECTIONS, goToSection, useActiveSection } from "../lib/sections.js";

function Dot({ id, label }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const active = useActiveSection();
  const isActive = pathname === "/" && active === id;

  return (
    <a
      href={`#${id}`}
      aria-label={label}
      onClick={(e) => {
        e.preventDefault();
        if (pathname === "/") goToSection(id);
        else navigate("/", { state: { scrollTo: id } });
      }}
      className="group relative flex items-center py-0.5"
    >
      <span
        className={`block h-1.5 rounded-full transition-all duration-300 ${
          isActive
            ? "w-5 bg-accent"
            : "w-1.5 bg-border-strong group-hover:bg-soft group-hover:w-3"
        }`}
      />
      <span
        className={`pointer-events-none absolute left-6 whitespace-nowrap rounded-full bg-base/90 px-2 py-0.5 label-mono text-[0.6rem] backdrop-blur transition-all duration-200 ${
          isActive
            ? "opacity-100 translate-x-0 text-ink"
            : "opacity-0 -translate-x-1 text-muted group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-soft"
        }`}
      >
        {label}
      </span>
    </a>
  );
}

export default function Rail() {
  return (
    <nav
      aria-label="Sections"
      className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40"
    >
      <div className="flex flex-col gap-3.5">
        {NAV_SECTIONS.map((s) => (
          <Dot key={s.id} id={s.id} label={s.label} />
        ))}
      </div>
    </nav>
  );
}
