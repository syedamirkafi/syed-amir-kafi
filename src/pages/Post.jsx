import { useEffect, useMemo, useState } from "react";
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
import { profile } from "../data/profile.js";
import { preprocessContent, toText } from "../lib/markdown.js";

const CALL_OUTS = new Set(["note", "tip", "warn", "key", "quote"]);

function StatCards({ stats }) {
  if (!stats || stats.length === 0) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-9">
      {stats.map((s, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-4 module-shift">
          <div className="serif text-3xl sm:text-4xl text-ink font-medium tabular-nums leading-none">
            {s.value}
          </div>
          <div className="text-soft text-xs leading-snug mt-2">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function InlineCode({ className, children }) {
  const text = toText(children);
  if (!className) {
    if (text.startsWith("==") && text.endsWith("==")) {
      return <mark className="mk">{text.slice(2, -2)}</mark>;
    }
    if (text.startsWith("++") && text.endsWith("++")) {
      return <span className="gold">{text.slice(2, -2)}</span>;
    }
  }
  return <code className={className}>{children}</code>;
}

function BlockQuote({ children }) {
  const parts = Array.isArray(children) ? children : [children];
  const markerEl = parts.find((c) => toText(c).trim() !== "");
  const marker = markerEl ? toText(markerEl).trim() : "";
  const m = marker.match(/^@(\w+)$/);
  if (m && CALL_OUTS.has(m[1])) {
    return (
      <div className={`callout callout-${m[1]}`}>
        {parts.filter((c) => c !== markerEl)}
      </div>
    );
  }
  return <blockquote className="pullquote">{children}</blockquote>;
}

const markdownComponents = {
  code: InlineCode,
  blockquote: BlockQuote,
};

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const post = useMemo(() => getPostBySlug(slug), [slug]);
  useDocumentTitle(post ? post.title : null);

  useEffect(() => {
    if (!post) {
      navigate("/", { replace: true });
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
  const shareUrl = `${window.location.origin}${import.meta.env.BASE_URL}blog/${slug}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const shareX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <main className="flex-1 pt-16 lg:pt-24 pb-20">
      <div
        className="reading-bar"
        style={{ width: `${progress}%` }}
      />
      <article className="relative">
        <div className="px-6 max-w-3xl mx-auto pt-8">
          <Link
            to="/"
            className="label-mono text-muted hover:text-ink transition-colors text-[0.7rem]"
          >
            ← Back to home
          </Link>

          <header className="mt-8 mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-2.5 py-1 rounded-full bg-accent/15 text-goldtext label-mono text-[0.6rem]">
                {post.category}
              </span>
              <span className="mono text-muted text-[0.65rem]">
                {formatDateLong(post.date)}
              </span>
              <span className="mono text-muted text-[0.65rem]">
                · {mins} MIN READ
              </span>
            </div>
            <h1 className="head-display text-3xl sm:text-5xl text-ink">
              {post.title}
            </h1>
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt=""
                className="mt-8 w-full rounded-2xl border border-border"
              />
            )}
            <p className="serif mt-6 text-lg sm:text-xl text-ink/80 leading-snug">
              {post.excerpt}
            </p>
          </header>

          <StatCards stats={post.stats} />

          <div className="prose-content">
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              components={markdownComponents}
            >
              {preprocessContent(post.content)}
            </ReactMarkdown>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-10 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="mono text-[0.6rem] px-2.5 py-1 rounded-full border border-border text-soft"
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
                className="label-mono text-[0.65rem] px-3.5 py-1.5 rounded-full border border-border-strong text-soft hover:border-ink hover:text-ink transition-all"
              >
                Share · IN
              </a>
              <a
                href={shareX}
                target="_blank"
                rel="noreferrer"
                className="label-mono text-[0.65rem] px-3.5 py-1.5 rounded-full border border-border-strong text-soft hover:border-ink hover:text-ink transition-all"
              >
                Post · X
              </a>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="head-display text-2xl text-ink mb-6">
                Related case studies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="rounded-2xl border border-border bg-card p-5 block module-shift"
                  >
                    <span className="label-mono text-muted text-[0.6rem]">
                      SHARED TAGS · {r.category}
                    </span>
                    <span className="serif text-ink font-medium text-base block mt-2">
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
                className="rounded-2xl border border-border bg-card p-5 block module-shift"
              >
                <span className="label-mono text-muted text-[0.6rem]">
                  ← PREVIOUS
                </span>
                <span className="serif text-ink font-medium text-lg block mt-2">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/blog/${next.slug}`}
                className="rounded-2xl border border-border bg-card p-5 block text-right module-shift"
              >
                <span className="label-mono text-muted text-[0.6rem]">
                  NEXT →
                </span>
                <span className="serif text-ink font-medium text-lg block mt-2">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>

          <div className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="serif text-ink font-medium text-lg mb-2">
              Working on something similar?
            </h2>
            <p className="text-soft text-sm leading-relaxed mb-4">
              I'm looking for working-student and intern roles in business
              analysis, digital transformation, and information systems in
              Germany. Happy to talk about this work or yours.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink hover:bg-ink/85 text-paper text-sm font-medium px-5 py-2.5 transition-colors"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
