import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="mt-32">
      <div className="px-6 max-w-4xl mx-auto py-10 border-t border-border">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-3 text-sm text-soft">
          <div className="flex items-baseline gap-2">
            <span className="serif text-base text-ink">Syed Amir Kafi</span>
            <span className="text-muted text-xs">· Business Analyst</span>
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-ink transition-colors"
          >
            {profile.email}
          </a>
          <span className="label-mono text-muted text-[0.6rem]">
            Last updated {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </span>
        </div>
      </div>
    </footer>
  );
}
