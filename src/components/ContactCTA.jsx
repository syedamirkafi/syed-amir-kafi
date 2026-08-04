import { profile } from "../data/profile.js";
import { withBase } from "../lib/base.js";

export default function ContactCTA({ compact = false }) {
  return (
    <div className={`${compact ? "p-6" : "p-8"} transition-all duration-300`}>
      <span className="label-mono text-ink/50">/// TRANSMISSION</span>
      <h3 className="head-display text-3xl sm:text-4xl mt-2 mb-4">
        {compact ? "Let's talk." : "Let's talk data, operations, and decisions."}
      </h3>
      <p className="text-sm text-ink/70 leading-relaxed max-w-prose mb-6">
        I'm open to working-student and entry-level data analytics, business
        intelligence, business analysis, and operations roles — remote-first in
        Germany. Here's how to reach me.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={withBase(profile.cvUrl)}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 bg-accent text-base label-mono font-semibold hover:bg-ink transition-all duration-300"
        >
          CV ↓
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="px-6 py-3 border border-ink label-mono font-semibold hover:bg-ink/5 transition-all duration-300"
        >
          EMAIL
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 border border-ink label-mono font-semibold hover:bg-ink/5 transition-all duration-300"
        >
          LINKEDIN
        </a>
      </div>
      <p className="label-mono text-ink/40 text-xs mt-5">
        {profile.email} · {profile.location}
      </p>
    </div>
  );
}
