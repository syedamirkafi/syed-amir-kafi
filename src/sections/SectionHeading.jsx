import Reveal from "../components/Reveal.jsx";

export default function SectionHeading({ kicker, number, title, description }) {
  return (
    <Reveal className="mb-10">
      <div className="relative">
        {number && (
          <span
            aria-hidden="true"
            className="serif pointer-events-none select-none absolute -top-10 right-0 text-[8rem] leading-none text-ink/[0.04] hidden md:block"
          >
            {number}
          </span>
        )}
        <div className="relative flex items-baseline gap-3 mb-4">
          {number && (
            <span className="mono text-muted text-[0.7rem] tabular-nums">
              {number} /
            </span>
          )}
          <span className="h-px flex-1 max-w-[2rem] bg-border-strong self-center" />
          <span className="label-mono text-accent text-[0.7rem]">{kicker}</span>
        </div>
        <h2 className="relative head-display section-title text-3xl sm:text-4xl text-ink max-w-2xl">
          {title}
        </h2>
        {description && (
          <p className="relative text-soft text-sm sm:text-base leading-relaxed max-w-xl mt-4">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
