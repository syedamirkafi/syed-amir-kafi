import { Link } from "react-router";
import { formatDate } from "../lib/posts.js";

export default function StoriesSection({ posts }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-ink/15" />
      <div className="space-y-10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="module-shift relative block border-2 border-ink bg-base group"
          >
            <span className="absolute -left-4 top-6 w-2 h-2 bg-vital" />
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="label-mono text-ink/40 text-xs">
                  {formatDate(post.date)}
                </span>
                <span className="label-mono text-[0.6rem] px-2 py-1 bg-ink text-base">
                  PERSONAL
                </span>
              </div>
              <h3 className="head-display text-2xl sm:text-3xl group-hover:text-vital transition-colors">
                {post.title}
              </h3>
              <p className="text-base sm:text-lg text-ink/75 leading-relaxed mt-4 max-w-2xl">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-1 mt-5">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
