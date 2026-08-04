import { Link } from "react-router";
import { profile } from "../data/profile.js";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/5 pb-6">
      <div className="px-4 sm:px-6 max-w-[1600px] mx-auto">
        <div className="label-mono text-ink/40 text-xs mb-3">
          SYED AMIR KAFI — DATA ANALYTICS · BUSINESS ANALYSIS · OPERATIONS · DESIGN
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <span className="label-mono text-ink/30 text-xs">
            © {new Date().getFullYear()} SYED AMIR KAFI
          </span>
          <div className="label-mono text-ink/30 text-xs">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink transition-colors"
            >
              LINKEDIN
            </a>
            {" · "}
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-ink transition-colors"
            >
              EMAIL
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}