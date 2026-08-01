import { Link } from "react-router";
import { profile } from "../data/profile.js";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 h-12 border-b border-ink/15 bg-base/90 backdrop-blur-sm">
      <Link
        to="/"
        className="label-mono font-semibold tracking-tight text-xs sm:text-sm"
      >
        {profile.nameShort}
      </Link>
      <div className="label-mono text-ink/50 hidden sm:block">
        {profile.coordinates}
      </div>
      <div className="label-mono text-ink/50 sm:hidden">
        {profile.coordinatesShort}
      </div>
    </header>
  );
}
