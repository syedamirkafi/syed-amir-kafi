import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getAllPosts, formatDateLong } from "../lib/posts.js";
import ContactCTA from "../components/ContactCTA.jsx";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const post = getPostBySlug(slug);

  useEffect(() => {
    if (!post) {
      navigate("/blog", { replace: true });
      return;
    }
    window.scrollTo(0, 0);
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, post, navigate]);

  if (!post) return null;

  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <main className="flex-1 pt-12 pb-20">
      <div
        className="reading-bar"
        style={{ width: `${progress}%` }}
      />
      <article className="relative">
        <div className="px-4 sm:px-6 max-w-3xl mx-auto pt-10">
          <Link
            to="/blog"
            className="label-mono text-ink/50 hover:text-vital transition-colors"
          >
            ← ARCHIVE
          </Link>

          <header className="mt-6 mb-10 border-b-2 border-ink pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-1 label-mono text-base bg-ink">
                {post.category}
              </span>
              <span className="label-mono text-ink/50">
                {formatDateLong(post.date)}
              </span>
            </div>
            <h1 className="head-display text-4xl sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg text-ink/70 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div className="prose-content max-w-none space-y-5">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-ink/20">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="label-mono text-[0.65rem] px-2 py-1 border border-ink/30 text-ink/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-12 mb-4">
            <span className="red-square" />
          </div>

          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
            {prev ? (
              <Link
                to={`/blog/${prev.slug}`}
                className="module-shift border-2 border-ink p-5 block"
              >
                <span className="label-mono text-ink/40 text-xs">
                  ← PREVIOUS
                </span>
                <span className="head-display text-xl block mt-2">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/blog/${next.slug}`}
                className="module-shift border-2 border-ink p-5 block text-right"
              >
                <span className="label-mono text-ink/40 text-xs">
                  NEXT →
                </span>
                <span className="head-display text-xl block mt-2">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>

          <section className="mt-16 mb-4">
            <ContactCTA compact />
          </section>
        </div>
      </article>
    </main>
  );
}
