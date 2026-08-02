import { Link } from "react-router";
import { formatDate } from "../lib/posts.js";

function BrowserFrame({ children }) {
  return (
    <div className="border border-ink bg-base">
      <div className="flex items-center gap-2 border-b border-ink px-3 py-2 bg-ink/3">
        <span className="w-3 h-3 rounded-full bg-red" />
        <span className="w-3 h-3 rounded-full bg-vital" />
        <span className="w-3 h-3 rounded-full bg-blue" />
        <div className="ml-2 flex-1 flex items-center px-3 py-1 border border-ink/30 bg-base label-mono text-[0.6rem] text-ink/60">
          http://the-monolith.app/pivot
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function TerminalFrame({ children }) {
  return (
    <div className="border border-ink bg-ink text-base">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-base/20">
        <span className="w-3 h-3 rounded-full bg-red" />
        <span className="w-3 h-3 rounded-full bg-vital" />
        <span className="w-3 h-3 rounded-full bg-blue" />
        <span className="ml-2 label-mono text-[0.6rem] text-base/60">
          ~/career-ops — zsh
        </span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function ConsoleFrame({ children }) {
  return (
    <div className="border border-ink bg-base">
      <div className="px-3 py-2 border-b border-ink bg-ink text-base">
        <span className="label-mono text-[0.6rem]">SEGA® CLOUD — CONSOLE</span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function DeviceFrame({ children }) {
  return (
    <div className="border border-ink bg-base p-3">
      <div className="border border-ink bg-base">
        <div className="flex justify-center pt-2">
          <span className="w-16 h-1 rounded-full bg-ink/20" />
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

const frames = {
  browser: BrowserFrame,
  terminal: TerminalFrame,
  console: ConsoleFrame,
  device: DeviceFrame,
};

export default function TechSection({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => {
        const Frame = frames[post.style] || BrowserFrame;
        const dark = post.style === "terminal";
        return (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="module-shift block group">
            <Frame>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`label-mono text-[0.6rem] px-2 py-1 border ${
                    dark ? "border-base/40 text-base" : "border-ink bg-ink text-base"
                  }`}
                >
                  TOOL v1.0
                </span>
                <span
                  className={`label-mono text-xs ${dark ? "text-base/40" : "text-ink/40"}`}
                >
                  {formatDate(post.date)}
                </span>
              </div>
              <h3
                className={`head-display text-2xl sm:text-3xl transition-colors ${
                  dark ? "text-base group-hover:text-vital" : "group-hover:text-vital"
                }`}
              >
                {post.title}
              </h3>
              <p
                className={`text-sm leading-relaxed mt-3 ${
                  dark ? "text-base/70" : "text-ink/70"
                }`}
              >
                {post.excerpt}
              </p>
              <div className={`flex flex-wrap gap-1 mt-4 ${dark ? "opacity-80" : ""}`}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`label-mono text-[0.6rem] px-2 py-1 ${
                      dark ? "text-base/70 border border-base/30" : "tag-chip"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Frame>
          </Link>
        );
      })}
    </div>
  );
}
