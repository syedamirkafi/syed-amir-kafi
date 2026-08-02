import { Link } from "react-router";
import { profile } from "../data/profile.js";
import { ThemeToggle } from "./ThemeToggle.jsx";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 h-12 border-b border-ink/5 bg-base/80 backdrop-blur-sm">
      <Link
        to="/"
        className="label-mono font-semibold tracking-tight text-xs sm:text-sm text-ink/70 hover:text-ink transition-colors"
      >
        {profile.nameShort}
      </Link>
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}
