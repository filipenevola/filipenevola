import Image from 'next/image';
import { Layout } from '../components/layout';
import { NewsletterCTA } from '../components/NewsletterSubscribe';

function BookCallout() {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-orange-300/25 bg-[#0e1730] p-5 shadow-2xl shadow-orange-950/30 md:p-7">
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-28 left-8 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative grid gap-6 md:grid-cols-[1fr_210px] md:items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-orange-200">
            <img
              src="/static/for-one-person-logo.svg"
              alt=""
              className="h-4 w-4"
            />
            New book
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
              For One Person
            </h2>
            <p className="max-w-2xl text-lg leading-7 text-neutral-100 md:text-xl">
              The mental models I use to build, decide, lead, live, and protect
              what matters — written as a living operating system, not a polished
              autobiography.
            </p>
            <p className="max-w-2xl text-sm leading-6 text-neutral-300">
              Start here if you want the models behind my decisions: family first,
              protecting the machine, asymmetric decisions, aggressive momentum,
              compounding, and the parts of life I refuse to repeat.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-medium text-orange-100">
            <span className="rounded-full bg-white/10 px-3 py-1">mental models</span>
            <span className="rounded-full bg-white/10 px-3 py-1">execution</span>
            <span className="rounded-full bg-white/10 px-3 py-1">health</span>
            <span className="rounded-full bg-white/10 px-3 py-1">family</span>
            <span className="rounded-full bg-white/10 px-3 py-1">company building</span>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <a
              href="https://foroneperson.com"
              className="inline-flex justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0e1730] transition-colors hover:bg-orange-100"
            >
              Read the book now
            </a>
            <a
              href="/?newsletter=1"
              className="inline-flex justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Get book updates
            </a>
          </div>
        </div>

        <a
          href="https://foroneperson.com"
          aria-label="Read For One Person"
          className="group mx-auto block w-40 md:w-full"
        >
          <img
            src="/static/for-one-person-cover.svg"
            alt="For One Person book cover"
            className="w-full rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.02]"
          />
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout>
      <div className="flex w-full max-w-5xl flex-col items-center justify-center space-y-6 md:w-5/6 xl:w-2/3">
        <div className="justify-center flex">
          <div className="w-3/4 md:w-5/6 justify-center flex">
            <Image
              src="/static/perfil2022.jpg"
              width="200"
              height="200"
              className="rounded-2xl"
              alt="Filipe Névola"
            />
          </div>
        </div>
        <BookCallout />

        <div className="flex w-full max-w-2xl flex-col space-y-4">
          <p className="text-neutral-300">
            I'm Filipe Névola. I'm a developer and entrepreneur focused on execution and sustainable growth.
          </p>
          <p className="text-neutral-300">
            Building{' '}
            <a href="https://quave.one" className="underline text-white hover:text-neutral-400">
              Quave ONE
            </a>{' '}
            (Cloud Platform),{' '}
            <a href="https://quave.dev" className="underline text-white hover:text-neutral-400">
              Quave Services
            </a>{' '}
            (Dev Boutique), and{' '}
            <a href="https://ervatoken.com" className="underline text-white hover:text-neutral-400">
              Erva Token
            </a>{' '}
            (Premium Yerba Mate).
          </p>
          <p className="text-neutral-300">
          <a href="https://quaveholdings.com" className="underline text-white hover:text-neutral-400">
              Quave Holdings
            </a>
            ' CEO.
          </p>
          <p className="text-neutral-300">
            Read my latest articles in my{' '}
            <a href="/blog" className="underline text-white hover:text-neutral-400">
              blog
            </a>
            .
          </p>
          <div className="text-neutral-300">
            <NewsletterCTA variant="inline-standalone" />
          </div>
          <div className="font-semibold pt-4 text-white">X Threads</div>
          <ul className="space-y-2 text-neutral-300">
            <li>
              <a
                href="https://twitter.com/search?q=%23quaveDev%20from%3Afilipenevola&src=typed_query"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                - How to be a Qua Ve Developer
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/FilipeNevola/status/1622936155816599552"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                - Já entrevistei mais de 500 Programadores Javascript. E aí, o que um
                dev Javascript deve saber?
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/FilipeNevola/status/1534523522407620611"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                - Em 2009 eu ganhava R$ 500 por mês. Em 2018: R$ 36 mil. O que
                aconteceu no meio disso?
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

