import { Link } from "react-router";
import { formatDate } from "../lib/posts.js";

const sectionLabels = {
  career: "CAREER",
  academia: "ACADEMIA",
  tech: "TECH",
  stories: "STORIES",
};

export default function PostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="module-shift block bg-base group transition-all duration-300"
    >
      <div
        className="flex items-center justify-center h-44 relative overflow-hidden"
        style={{ backgroundColor: post.cover }}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="head-display text-base text-3xl sm:text-5xl opacity-90 px-6 text-center">
            {post.title}
          </span>
        )}
        <span className="absolute top-0 left-0 px-2 py-1 label-mono text-base bg-ink">
          {sectionLabels[post.section] || post.section.toUpperCase()}
        </span>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between label-mono text-ink/50">
          <span>{post.category}</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <h3 className="head-display text-2xl sm:text-3xl">
          {post.title}
        </h3>
        <p className="text-sm text-ink/70 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="pt-1">
          <span className="label-mono text-ink/40 text-xs">
            {post.tags.slice(0, 3).join(" · ")}
          </span>
        </div>
      </div>
    </Link>
  );
}
