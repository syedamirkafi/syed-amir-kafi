import { Link } from "react-router";
import { formatDate } from "../lib/posts.js";

export default function AcademiaSection({ posts }) {
  return (
    <div className="space-y-6">
      {posts.map((post, i) => (
        <Link
          key={post.slug}
          to={`/blog/${post.slug}`}
          className="module-shift block border-2 border-ink/40 hover:border-ink glass-card group"
        >
          <div className="flex items-start gap-6 p-6 sm:p-8">
            <div className="label-mono text-vital text-2xl sm:text-3xl pt-1 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="label-mono text-[0.6rem] px-2 py-1 bg-ink text-base">
                  {post.category}
                </span>
                <span className="label-mono text-ink/40 text-xs">
                  FIELD: RESEARCH PRACTICE
                </span>
                <span className="label-mono text-ink/40 text-xs">
                  {formatDate(post.date)}
                </span>
              </div>
              <h3 className="head-display text-2xl sm:text-3xl group-hover:text-vital transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed mt-3 max-w-2xl">
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
          <div className="border-t border-ink/20 px-6 sm:px-8 py-3 flex items-center justify-between">
            <span className="label-mono text-ink/40 text-xs">
              ABSTRACT → FIELD REPORT
            </span>
            <span className="label-mono text-vital text-xs">READ →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
