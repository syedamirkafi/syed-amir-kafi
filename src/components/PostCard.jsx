import { Link } from "react-router";
import { formatDate } from "../lib/posts.js";

export default function PostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="module-shift block border-2 border-ink bg-base group"
    >
      <div
        className="flex items-center justify-center h-44"
        style={{ backgroundColor: post.cover }}
      >
        <span className="head-display text-base text-3xl sm:text-5xl opacity-90 px-6 text-center">
          {post.title}
        </span>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between label-mono text-ink/50">
          <span>{post.category}</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <h3 className="head-display text-2xl sm:text-3xl">{post.title}</h3>
        <p className="text-sm text-ink/70 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-1 pt-1">
          {post.tags.map((tag) => (
            <span key={tag} className="tag-chip">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
