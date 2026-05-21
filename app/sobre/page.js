import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { PageHeader } from '@/components/PageHeader';
import {
  PAGE_META,
  SITE_HEADLINE,
  SITE_TAGLINE,
  SITE_WHY_EXISTS,
} from '@/lib/site';
import { buildPageMetadata } from '@/lib/og';

export const metadata = buildPageMetadata(PAGE_META.sobre);

const PRINCIPLES = [
  {
    title: 'Pé no chão',
    body: 'Celebramos vitórias e encaramos derrotas com lucidez. Cada resultado é um capítulo, não o fim do mundo.',
  },
  {
    title: 'Otimista e realista',
    body: 'Acreditamos no elenco e no projeto do clube, mas sem prometer título todo ano nem enterro após um tropeço.',
  },
  {
    title: 'Sem chiliquismo',
    body: 'Nada de “urgência” fabricada, bastidor inventado ou clique em cima do nervosismo da torcida.',
  },
  {
    title: 'Sem sensacionalismo',
    body: 'Notícias com contexto, opiniões com argumento e linguagem que respeita quem lê — inclusive quando discorda.',
  },
];

const WE_DONT = [
  'Transformar cada jogo em crise existencial',
  'Tratar jogador ou técnico como vilão da semana',
  'Alimentar a ideia de que torcer é sofrer para “merecer” a vitória',
  'Copiar o tom histérico das redes sociais',
];

const WE_DO = [
  'Reunir notícias com critério editorial (crawler + curadoria)',
  'Publicar opiniões e vídeos no nosso tom: claro, direto, sem gritaria',
  'Manter a agenda de jogos organizada, com calendário útil',
  'Lembrar que torcer pode ser leve, informado e prazeroso',
];

export default function SobrePage() {
  return (
    <SiteLayout>
      <PageHeader
        title="Sobre"
        description={SITE_TAGLINE}
      />

      <section className="mb-12 rounded-2xl border border-palmeiras-light/40 bg-palmeiras-dark/50 px-6 py-8 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-palmeiras-muted">
          Nossa proposta
        </p>
        <p className="mt-3 text-xl font-bold text-white md:text-2xl">{SITE_HEADLINE}</p>
      </section>

      <div className="space-y-12 text-palmeiras-muted">
        <section>
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            {SITE_WHY_EXISTS.title}
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed">
            {SITE_WHY_EXISTS.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            Para quem é
          </h2>
          <p className="mt-4 leading-relaxed">
            Para o torcedor palmeirense apaixonado que quer acompanhar o clube com
            tranquilidade — sem escolher entre “só felicidade fake” e “só sofrimento
            nobre”. O meio-termo saudável:{' '}
            <strong className="font-medium text-white">
              informado, engajado e emocionalmente estável
            </strong>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            Nossos princípios
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map(({ title, body }) => (
              <li
                key={title}
                className="rounded-xl border border-palmeiras-light/30 bg-palmeiras-darker/40 p-5"
              >
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-white">O que evitamos</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed">
              {WE_DONT.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-palmeiras-light" aria-hidden>
                    ×
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">O que buscamos</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed">
              {WE_DO.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-white" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-palmeiras-light/40 bg-palmeiras-dark/60 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white">
            Torcer para ser feliz
          </h2>
          <p className="mt-4 leading-relaxed">
            Futebol é paixão — e paixão pode caber na vida sem virar drama diário.
            Fechar o app depois de ler uma notícia ou ver a escalação não precisa
            deixar aquele nó no estômago que não ajuda ninguém.
          </p>
          <p className="mt-4 leading-relaxed">
            Se isso combina com você, explore a{' '}
            <Link href="/" className="text-white underline hover:text-palmeiras-muted">
              timeline
            </Link>
            , as{' '}
            <Link href="/noticias" className="text-white underline hover:text-palmeiras-muted">
              notícias
            </Link>
            , as{' '}
            <Link href="/opinioes" className="text-white underline hover:text-palmeiras-muted">
              opiniões
            </Link>{' '}
            e a{' '}
            <Link href="/jogos" className="text-white underline hover:text-palmeiras-muted">
              agenda de jogos
            </Link>
            .
          </p>
        </section>
      </div>
    </SiteLayout>
  );
}
