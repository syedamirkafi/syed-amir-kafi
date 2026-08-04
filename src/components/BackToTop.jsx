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
      className={`fixed bottom-20 right-4 sm:right-6 z-40 w-10 h-10 flex items-center justify-center border border-ink/30 bg-base/90 backdrop-blur-sm label-mono text-ink/70 hover:bg-ink hover:text-base hover:border-ink transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      ↑
    </button>
  );
}
