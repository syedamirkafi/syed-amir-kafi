import { Link, useLocation } from "react-router";

const items = [
  { n: "01", label: "HOME", to: "/" },
  { n: "02", label: "PROJECTS", to: "/projects" },
  { n: "03", label: "WINS", to: "/wins" },
  { n: "04", label: "ABOUT", to: "/about" },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-ink/15 bg-base">
      <div className="flex items-stretch divide-x divide-ink/15">
        {items.map((item) => {
          const active =
            item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.n}
              to={item.to}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors ${
                active
                  ? "bg-ink text-base"
                  : "hover:bg-ink/5"
              }`}
            >
              <span
                className={`label-mono text-[0.55rem] ${
                  active ? "opacity-60" : "opacity-50"
                }`}
              >
                {item.n}
              </span>
              <span className="label-mono text-[0.65rem] sm:text-xs font-semibold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
