import { Link } from "react-router";
import { formatDate } from "../lib/posts.js";

export default function CareerSection({ posts }) {
  return (
    <div className="space-y-8">
      {posts.map((post, i) => (
        <Link
          key={post.slug}
          to={`/blog/${post.slug}`}
          className="module-shift block border-2 border-ink/40 hover:border-ink glass-card group"
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-4 glass-dark text-base p-6 flex flex-col justify-between min-h-[180px]">
              <span className="label-mono text-xs opacity-60">
                FIELD LOG {String(i + 1).padStart(2, "0")}
              </span>
              <div className="space-y-4 mt-6">
                {post.stats.length > 0 ? (
                  post.stats.map((s) => (
                    <div key={s.label}>
                      <div className="head-display text-3xl sm:text-4xl text-vital">
                        {s.value}
                      </div>
                      <div className="label-mono text-[0.6rem] opacity-70 mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="head-display text-3xl text-base/40">
                    PROOF
                    <br />
                    ON FILE
                  </div>
                )}
              </div>
            </div>
            <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="label-mono text-[0.6rem] px-2 py-1 bg-ink text-base">
                  {post.category}
                </span>
                <span className="label-mono text-ink/40 text-xs">
                  {formatDate(post.date)}
                </span>
              </div>
              <h3 className="head-display text-2xl sm:text-3xl group-hover:text-vital transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed mt-3 max-w-prose">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-1 mt-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
