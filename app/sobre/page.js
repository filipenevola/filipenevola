import Link from 'next/link';
import { SiteLayout } from '@/components/SiteLayout';
import { SiteHero } from '@/components/SiteHero';
import { PAGE_META } from '@/lib/site';
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
      <SiteHero showAboutLink={false} />

      <div className="prose-palmeiras space-y-12 text-palmeiras-muted">
        <section>
          <h2 className="text-xl font-semibold text-white md:text-2xl">
            Para quem é este site
          </h2>
          <p className="mt-4 leading-relaxed">
            Este site é para o torcedor palmeirense que ama o Verdão de verdade —
            e quer acompanhar o clube com tranquilidade. Você pode ser apaixonado
            sem ser refém de humor de internet, de comentarista barulhento ou de
            onda de pânico a cada rodada.
          </p>
          <p className="mt-4 leading-relaxed">
            Aqui a torcida não precisa escolher entre “só felicidade fake” e “só
            sofrimento nobre”. Existe um meio-termo saudável:{' '}
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
            Este projeto nasceu da vontade de acompanhar o Palmeiras com alegria
            sustentável: saber o que está acontecendo, ter opinião formada, não
            perder um jogo — e fechar o notebook ou o app sem aquela angústia que
            não ajuda ninguém.
          </p>
          <p className="mt-4 leading-relaxed">
            Somos site de torcedor, não oficial do clube. Independentes,
            transparentes e com humor contido. Se isso combina com você,{' '}
            <Link href="/" className="text-white underline hover:text-palmeiras-muted">
              explore a timeline
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
