import Link from 'next/link';
import { CONTENT_TYPES } from '@/lib/site';
import { formatDateTime } from '@/lib/mongodb';

const TYPE_STYLES = {
  noticia: 'bg-emerald-900/50 text-emerald-100 border-emerald-600',
  opiniao: 'bg-white/10 text-white border-palmeiras-light',
  jogo: 'bg-palmeiras-darker text-palmeiras-muted border-palmeiras-light',
};

export function TimelineItem({ entry }) {
  const meta = CONTENT_TYPES[`${entry.type}`] || CONTENT_TYPES.noticia;

  return (
    <article className="relative border-l-2 border-palmeiras-light pl-6 pb-8 last:pb-0">
      <span
        className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-white ring-4 ring-palmeiras"
        aria-hidden
      />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${TYPE_STYLES[entry.type]}`}
        >
          {meta.label}
        </span>
        <time className="text-palmeiras-muted/90" dateTime={entry.publishedAt}>
          {formatDateTime(entry.publishedAt)}
        </time>
        {entry.mediaType === 'video' && (
          <span className="text-xs text-palmeiras-muted">Vídeo</span>
        )}
        {entry.status === 'upcoming' && (
          <span className="text-xs font-medium text-white">Próximo jogo</span>
        )}
      </div>
      <h2 className="mt-2 text-lg font-semibold text-white">
        <Link href={entry.href} className="hover:text-palmeiras-muted transition-colors">
          {entry.title}
        </Link>
      </h2>
      {entry.summary && (
        <p className="mt-1 text-sm text-palmeiras-muted line-clamp-2">{entry.summary}</p>
      )}
    </article>
  );
}
