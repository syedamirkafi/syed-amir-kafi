import { useEffect, useState } from "react";
import { photos } from "../data/photos.js";
import { withBase } from "../lib/base.js";

export default function PhotoSection() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => setOpen(photo)}
            className="module-shift block w-full bg-base border border-ink/10 hover:border-ink/30 text-left group transition-all duration-300"
          >
            <div className="relative overflow-hidden border-b border-ink/20">
              <img
                src={withBase(photo.src)}
                alt={photo.alt}
                className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <span className="absolute top-0 left-0 px-2 py-1 label-mono text-[0.6rem] text-base bg-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-4">
              <p className="head-display text-base">{photo.caption}</p>
              <p className="label-mono text-ink/40 text-[0.6rem] mt-1">
                {photo.date} · {photo.place}
              </p>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[70] bg-ink/90 flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <div className="max-w-3xl w-full border border-base/30 bg-ink p-2">
            <img
              src={withBase(open.src)}
              alt={open.alt}
              className="w-full max-h-[70vh] object-contain"
            />
            <div className="flex items-center justify-between px-2 py-3">
              <div>
                <p className="head-display text-base text-base">{open.caption}</p>
                <p className="label-mono text-base/50 text-[0.6rem] mt-1">
                  {open.date} · {open.place}
                </p>
              </div>
              <span className="label-mono text-base/70 text-xs cursor-pointer">
                ESC / CLICK TO CLOSE ✕
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
