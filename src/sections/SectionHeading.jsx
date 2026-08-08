import Reveal from "../components/Reveal.jsx";

export default function SectionHeading({ kicker, number, title, description }) {
  return (
    <Reveal className="mb-10">
      <div className="flex items-baseline gap-3 mb-4">
        {number && (
          <span className="mono text-muted text-[0.7rem] tabular-nums">
            {number} /
          </span>
        )}
        <span className="h-px flex-1 max-w-[2rem] bg-border-strong self-center" />
        <span className="label-mono text-accent text-[0.7rem]">{kicker}</span>
      </div>
      <h2 className="head-display section-title text-3xl sm:text-4xl text-ink max-w-2xl">
        {title}
      </h2>
      {description && (
        <p className="text-soft text-sm sm:text-base leading-relaxed max-w-xl mt-4">
          {description}
        </p>
      )}
    </Reveal>
  );
}
