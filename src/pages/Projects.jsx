import { portfolio } from "../data/portfolio.js";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
import ContactCTA from "../components/ContactCTA.jsx";
import { SHOWCASES } from "../components/ProjectShowcases.jsx";

export default function Projects() {
  useDocumentTitle("The Projects");
  const cases = portfolio.map((item) => ({
    item,
    Showcase: SHOWCASES[item.id] || null,
  }));

  return (
    <main className="flex-1 pt-12 pb-20">
      <div className="px-4 sm:px-6 max-w-[1600px] mx-auto pt-8">
        <header className="pb-6 mb-10">
          <span className="label-mono text-ink/50">/// 02 — OUTPUTS</span>
          <h1 className="head-display text-5xl sm:text-7xl mt-2">
            The Projects
          </h1>
          <p className="text-sm text-ink/60 mt-3 max-w-xl">
            What I'm building now and what I've shipped — each one shown the
            way it actually works.
          </p>
        </header>

        <div className="space-y-16">
          {cases.map(({ item, Showcase }) =>
            Showcase ? (
              <Showcase key={item.id} item={item} />
            ) : (
              <div key={item.id} className="border border-ink/20 p-8">
                <h2 className="head-display text-3xl">{item.title}</h2>
                <p className="text-sm text-ink/70 mt-3">{item.description}</p>
              </div>
            )
          )}
        </div>

        <div className="mt-16 mb-4">
          <ContactCTA compact />
        </div>
      </div>
    </main>
  );
}
