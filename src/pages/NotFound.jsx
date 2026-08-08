import { Link } from "react-router";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";

export default function NotFound() {
  useDocumentTitle("Not Found");
  return (
    <main className="flex-1 pt-32 pb-24">
      <div className="max-w-md mx-auto px-6 text-center">
        <span className="label-mono text-accent text-[0.7rem]">404</span>
        <h1 className="head-display text-4xl sm:text-5xl text-ink mt-3 mb-4">
          This page doesn't exist.
        </h1>
        <p className="text-soft text-sm leading-relaxed mb-8">
          The link may be outdated — most of my work now lives on a single page.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink hover:bg-ink/85 text-base text-sm font-medium px-5 py-2.5 transition-colors"
        >
          Back to home →
        </Link>
      </div>
    </main>
  );
}
