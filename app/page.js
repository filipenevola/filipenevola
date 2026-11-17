import Image from 'next/image';
import Link from 'next/link';
import { Layout } from '../components/layout';
import { NewsletterCTA } from '../components/NewsletterSubscribe';

const YOUTUBE_URL = 'https://www.youtube.com/@filipenevola';

function OneIdeaCallout() {
  return (
    <a
      href={YOUTUBE_URL}
      className="group relative block w-full max-w-2xl overflow-hidden rounded-3xl border border-[#ffd400]/25 bg-[#111] p-6 transition-colors hover:border-[#ffd400]/60 md:p-8"
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#ffd400]/15 blur-3xl" />
      <div className="relative space-y-3">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffd400]">
          On YouTube
        </div>
        <h2 className="text-4xl font-semibold leading-none text-[#f4f1ea] md:text-5xl">
          one idea<span className="text-[#ffd400]">.</span>
        </h2>
        <p className="max-w-xl text-neutral-300">
          One book, one podcast, one conversation, one idea. Compressed, dense,
          no filler.
        </p>
        <span className="inline-flex rounded-full bg-[#ffd400] px-5 py-2.5 text-sm font-semibold text-black transition-colors group-hover:bg-[#ffe14d]">
          Watch on YouTube
        </span>
      </div>
    </a>
  );
}

function BookCallout() {
  return (
    <section className="flex w-full max-w-2xl items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <a href="https://foroneperson.com" aria-label="Read For One Person" className="shrink-0">
        <Image
          src="/static/for-one-person-cover.svg"
          alt="For One Person book cover"
          width={680}
          height={1000}
          unoptimized
          className="w-12 rounded-md ring-1 ring-white/10"
        />
      </a>
      <div className="min-w-0 flex-1">
        <div className="text-xs uppercase tracking-[0.18em] text-neutral-500">My book</div>
        <h2 className="text-lg font-semibold text-white">For One Person</h2>
        <p className="text-sm text-neutral-400">
          The mental models I use to build, decide, lead, and live.
        </p>
      </div>
      <a
        href="https://foroneperson.com"
        className="shrink-0 text-sm text-white underline decoration-[#ffd400] underline-offset-4 hover:text-[#ffd400]"
      >
        Read it
      </a>
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
              src="/static/filipe-one-idea.png"
              width="200"
              height="200"
              priority
              className="rounded-full ring-1 ring-[#ffd400]/30"
              alt="Filipe Névola"
            />
          </div>
        </div>
        <OneIdeaCallout />

        <div className="flex w-full max-w-2xl flex-col space-y-4">
          <p className="text-neutral-300">
            I&apos;m Filipe Névola. I&apos;m a developer and entrepreneur focused on execution and sustainable growth.
          </p>
          <p className="text-neutral-300">
            Building{' '}
            <a href="https://quave.one" className="underline text-white hover:text-[#ffd400]">
              Quave ONE
            </a>{' '}
            (Cloud Platform),{' '}
            <a href="https://quave.dev" className="underline text-white hover:text-[#ffd400]">
              Quave Services
            </a>{' '}
            (Dev Boutique), and{' '}
            <a href="https://ervatoken.com" className="underline text-white hover:text-[#ffd400]">
              Erva Token
            </a>{' '}
            (Premium Yerba Mate).
          </p>
          <p className="text-neutral-300">
          <a href="https://quaveholdings.com" className="underline text-white hover:text-[#ffd400]">
              Quave Holdings
            </a>
            &apos;s CEO.
          </p>
          <p className="text-neutral-300">
            Read my latest articles in my{' '}
            <Link
              href="/blog"
              prefetch={true}
              className="underline text-white hover:text-[#ffd400]"
            >
              blog
            </Link>
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
                className="hover:text-[#ffd400] transition-colors"
              >
                - How to be a Qua Ve Developer
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/FilipeNevola/status/1622936155816599552"
                target="_blank"
                className="hover:text-[#ffd400] transition-colors"
              >
                - Já entrevistei mais de 500 Programadores Javascript. E aí, o que um
                dev Javascript deve saber?
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/FilipeNevola/status/1534523522407620611"
                target="_blank"
                className="hover:text-[#ffd400] transition-colors"
              >
                - Em 2009 eu ganhava R$ 500 por mês. Em 2018: R$ 36 mil. O que
                aconteceu no meio disso?
              </a>
            </li>
          </ul>
        </div>
        <BookCallout />
      </div>
    </Layout>
  );
}
