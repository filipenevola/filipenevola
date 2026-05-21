import { formatGameDate } from '@/lib/mongodb';
import { getGoogleCalendarAddUrl } from '@/lib/jogos-calendar';

export function GameCard({ jogo, variant = 'upcoming' }) {
  const title = jogo.isHome
    ? `Palmeiras x ${jogo.opponent}`
    : `${jogo.opponent} x Palmeiras`;
  const calendarUrl = getGoogleCalendarAddUrl({
    title,
    startAt: jogo.kickoffAt,
    details: jogo.competition,
    location: jogo.venue,
  });

  return (
    <article className="rounded-xl border border-palmeiras-light/40 bg-palmeiras-dark/60 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-palmeiras-muted">
            {jogo.competition}
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-palmeiras-muted">{jogo.venue}</p>
          <time className="mt-2 block text-sm text-white" dateTime={jogo.kickoffAt}>
            {formatGameDate(jogo.kickoffAt)}
          </time>
        </div>
        {variant === 'finished' && jogo.result && (
          <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-palmeiras">
            {jogo.result}
          </span>
        )}
      </div>
      {variant === 'upcoming' && (
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex text-sm font-medium text-white underline hover:text-palmeiras-muted"
        >
          Adicionar ao Google Calendar
        </a>
      )}
    </article>
  );
}
