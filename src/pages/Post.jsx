import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import {
  getPostBySlug,
  getAllPosts,
  formatDateLong,
  readingTime,
} from "../lib/posts.js";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
import ContactCTA from "../components/ContactCTA.jsx";

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const post = getPostBySlug(slug);
  useDocumentTitle(post ? post.title : null);

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
  const related = all
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2);
  const mins = readingTime(post);
  const encoded = encodeURIComponent(post.title);
  const shareUrl = `https://syedamirkafi.github.io/the-monolith/blog/${slug}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const shareX = `https://twitter.com/intent/tweet?text=${encoded}&url=${encodeURIComponent(shareUrl)}`;

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
              <span className="label-mono text-ink/50">·</span>
              <span className="label-mono text-ink/50">{mins} MIN READ</span>
            </div>
            <h1 className="head-display text-4xl sm:text-6xl">
              {post.title}
            </h1>
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt=""
                className="mt-8 w-full border-2 border-ink"
              />
            )}
            <p className="mt-5 text-lg text-ink/70 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div className="prose-content max-w-none space-y-5">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-10 pt-6 border-t border-ink/20">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="label-mono text-[0.65rem] px-2 py-1 border border-ink/30 text-ink/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <a
                href={shareLinkedIn}
                target="_blank"
                rel="noreferrer"
                className="label-mono text-[0.65rem] px-3 py-1.5 border-2 border-ink hover:bg-ink hover:text-base transition-colors"
              >
                SHARE · IN
              </a>
              <a
                href={shareX}
                target="_blank"
                rel="noreferrer"
                className="label-mono text-[0.65rem] px-3 py-1.5 border-2 border-ink hover:bg-ink hover:text-base transition-colors"
              >
                POST · X
              </a>
            </div>
          </div>

          <div className="mt-12 mb-4">
            <span className="red-square" />
          </div>

          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="head-display text-2xl mb-6">Related Reads</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="module-shift border-2 border-ink p-5 block"
                  >
                    <span className="label-mono text-ink/40 text-xs">
                      SHARED TAGS · {r.category}
                    </span>
                    <span className="head-display text-lg block mt-2">
                      {r.title}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

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
