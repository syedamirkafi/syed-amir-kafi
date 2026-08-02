import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

const items = [
  { n: "01", label: "HOME", to: "/" },
  { n: "02", label: "PROJECTS", to: "/projects" },
  { n: "03", label: "WINS", to: "/wins" },
  { n: "04", label: "ABOUT", to: "/about" },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < 80) {
        setHidden(false);
      } else if (current > lastScroll + 30) {
        setHidden(true);
      } else if (current < lastScroll - 30) {
        setHidden(false);
      }
      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-ink/10 bg-base/80 backdrop-blur-sm transition-all duration-350 ease-out ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-stretch divide-x divide-ink/10">
        {items.map((item) => {
          const active =
            item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.n}
              to={item.to}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all duration-200 ${
                active
                  ? "bg-ink/3 text-ink"
                  : "text-ink/40 hover:text-ink/70 hover:bg-ink/3"
              }`}
            >
              <span className="label-mono text-[0.55rem] opacity-60">
                {item.n}
              </span>
              <span className="label-mono text-[0.6rem] sm:text-xs font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}