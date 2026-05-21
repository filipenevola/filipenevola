import Link from 'next/link';
import { formatDateTime } from '@/lib/mongodb';

export function ContentCard({ href, title, summary, publishedAt, badge }) {
  return (
    <article className="rounded-xl border border-palmeiras-light/40 bg-palmeiras-dark/60 p-5 transition-colors hover:border-palmeiras-light">
      {badge && (
        <span className="text-xs font-medium uppercase tracking-wide text-palmeiras-muted">
          {badge}
        </span>
      )}
      <h2 className="mt-1 text-lg font-semibold text-white">
        <Link href={href} className="hover:text-palmeiras-muted transition-colors">
          {title}
        </Link>
      </h2>
      {summary && <p className="mt-2 text-sm text-palmeiras-muted">{summary}</p>}
      {publishedAt && (
        <time className="mt-3 block text-xs text-palmeiras-muted/80" dateTime={publishedAt}>
          {formatDateTime(publishedAt)}
        </time>
      )}
    </article>
  );
}
