import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion.js";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })}
      className={`fixed bottom-6 right-4 sm:right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full border border-border bg-card text-soft hover:bg-accent hover:text-accent-ink hover:border-accent transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      ↑
    </button>
  );
}
