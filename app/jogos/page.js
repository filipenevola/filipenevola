import { SiteLayout } from '@/components/SiteLayout';
import { PageHeader } from '@/components/PageHeader';
import { GameCard } from '@/components/GameCard';
import { EmptyState } from '@/components/EmptyState';
import { getJogos, splitJogos } from '@/lib/mongodb';
import { getGoogleCalendarUrl } from '@/lib/jogos-calendar';
import { PAGE_META } from '@/lib/site';
import { buildPageMetadata } from '@/lib/og';

export const metadata = buildPageMetadata({
  ...PAGE_META.jogos,
  cta: 'Ver agenda →',
});

export default async function JogosPage() {
  const jogos = await getJogos();
  const { upcoming, past } = splitJogos(jogos);
  const calendarUrl = getGoogleCalendarUrl();

  return (
    <SiteLayout>
      <PageHeader
        title="Jogos"
        description="Próximos confrontos, resultados anteriores e calendário sincronizado com Google Calendar."
      >
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-palmeiras hover:bg-palmeiras-muted transition-colors"
        >
          Abrir calendário no Google
        </a>
      </PageHeader>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-white">Próximos jogos</h2>
        {upcoming.length === 0 ? (
          <EmptyState message="Nenhum jogo agendado no momento." />
        ) : (
          <ul className="flex flex-col gap-4">
            {upcoming.map((jogo) => (
              <li key={jogo._id}>
                <GameCard jogo={jogo} variant="upcoming" />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-white">Jogos anteriores</h2>
        {past.length === 0 ? (
          <EmptyState message="Nenhum resultado registrado ainda." />
        ) : (
          <ul className="flex flex-col gap-4">
            {past.map((jogo) => (
              <li key={jogo._id}>
                <GameCard jogo={jogo} variant="finished" />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Google Calendar</h2>
        <p className="mb-4 text-sm text-palmeiras-muted">
          Agenda embutida. Configure{' '}
          <code className="rounded bg-palmeiras-darker px-1.5 py-0.5 text-xs">
            NEXT_PUBLIC_GOOGLE_CALENDAR_URL
          </code>{' '}
          com o calendário oficial dos jogos.
        </p>
        <div className="overflow-hidden rounded-xl border border-palmeiras-light/40 bg-white">
          <iframe
            title="Calendário de jogos do Palmeiras"
            src={calendarUrl}
            className="h-[480px] w-full"
          />
        </div>
      </section>
    </SiteLayout>
  );
}
