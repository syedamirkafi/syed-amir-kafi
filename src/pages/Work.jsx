import { portfolio } from "../data/portfolio.js";
import ContactCTA from "../components/ContactCTA.jsx";
import { withBase } from "../lib/base.js";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";

export default function Work() {
  useDocumentTitle("The Work");
  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pt-8">
        <header className="border-b-2 border-ink pb-6 mb-10">
          <span className="label-mono text-ink/50">/// 03 — OUTPUTS</span>
          <h1 className="head-display text-5xl sm:text-7xl mt-2">The Work</h1>
          <p className="text-sm text-ink/60 mt-3 max-w-xl">
            Projects and proof points — the things I've built, measured, and
            shipped across analytics, business analysis, and operations.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolio.map((item) => (
            <a
              key={item.id}
              href={withBase(item.href)}
              target={item.href.startsWith("/") ? undefined : "_blank"}
              rel="noreferrer"
              className="module-shift block border-2 border-ink bg-base group"
            >
              <div className="relative w-full h-60 overflow-hidden border-b-2 border-ink">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <span className="head-display text-base text-3xl sm:text-5xl opacity-90 px-6 text-center">
                    {item.title}
                  </span>
                </div>
                <span
                  className="absolute top-0 left-0 px-2 py-1 label-mono text-base"
                  style={{ backgroundColor: item.color }}
                >
                  {item.tag}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="head-display text-2xl">{item.title}</h3>
                <p className="text-sm text-ink/70 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 mb-16">
          <ContactCTA />
        </div>
      </div>
    </main>
  );
}
