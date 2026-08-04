import { Link } from "react-router";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
import Reveal from "../components/Reveal.jsx";

export default function NotFound() {
  useDocumentTitle("404 — Signal Lost");

  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-3xl mx-auto pt-20 text-center">
        <Reveal className="space-y-8">
          <span className="label-mono text-ink/50">/// SIGNAL LOST</span>
          <h1 className="head-display text-7xl sm:text-9xl text-destructive">
            404
          </h1>
          <p className="text-ink/70 max-w-md mx-auto leading-relaxed">
            This coordinate does not exist in the archive. The monolith stands,
            but the signal you're looking for was never recorded here.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="px-6 py-3 bg-vital text-base label-mono font-semibold hover:bg-ink transition-all duration-300"
            >
              RETURN TO BASE
            </Link>
            <Link
              to="/projects"
              className="px-6 py-3 border border-ink label-mono font-semibold hover:bg-ink/5 transition-all duration-300"
            >
              BROWSE THE ARCHIVE
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
