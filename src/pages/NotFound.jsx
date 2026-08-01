import { Link } from "react-router";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";

export default function NotFound() {
  useDocumentTitle("404 — Signal Lost");

  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-3xl mx-auto pt-20 text-center">
        <div className="border-2 border-ink p-10 sm:p-16">
          <span className="label-mono text-ink/50">/// SIGNAL LOST</span>
          <h1 className="head-display text-7xl sm:text-9xl mt-4 text-red">
            404
          </h1>
          <p className="mt-6 text-ink/70 max-w-md mx-auto leading-relaxed">
            This coordinate does not exist in the archive. The monolith stands,
            but the signal you're looking for was never recorded here.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="px-6 py-3 bg-vital text-base label-mono font-semibold hover:bg-ink transition-colors"
            >
              RETURN TO BASE
            </Link>
            <Link
              to="/projects"
              className="px-6 py-3 border-2 border-ink label-mono font-semibold hover:bg-ink hover:text-base transition-colors"
            >
              BROWSE THE ARCHIVE
            </Link>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <span className="red-square" />
        </div>
      </div>
    </main>
  );
}
