import Image from 'next/image';
import { Layout } from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center space-y-4 w-full md:w-3/4 xl:w-1/2">
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
        <div className="flex flex-col space-y-4">
          <p className="text-neutral-300">
            I'm Filipe Névola, and I'm{' '}
            <a href="https://quaveholdings.com" className="underline text-white hover:text-neutral-400">
              Quave Holdings
            </a>
            ' CEO, Developer & Instructor trying to be better every day.
          </p>

          <p className="text-neutral-300">
            Read my latest articles in my{' '}
            <a href="/blog" className="underline text-white hover:text-neutral-400">
              blog
            </a>
            .
          </p>

          <p className="text-neutral-300">
            Learn how to code at{' '}
            <a href="https://codeftw.dev" className="underline text-white hover:text-neutral-400">
              CodeFTW
            </a>{' '}
            (Free and in Portuguese) and{' '}
            <a href="https://aiproofdev.com" className="underline text-white hover:text-neutral-400">
              AIProofDev
            </a>{' '}
            (Paid and in English).
          </p>
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
        <div className="font-semibold pt-4 text-white">Articles</div>
        <ul className="space-y-2 text-neutral-300">
          <li>
            <a href="https://dev.to/filipenevola" target="_blank" className="hover:text-white transition-colors">
              - Blog (dev.to/filipenevola)
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@filipenevola/how-to-migrate-to-mono-repository-without-losing-any-git-history-7a4d80aa7de2"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              - How to migrate to Mono Repository without losing any Git history
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@filipenevola/vscode-missing-features-837a6bd660ca"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              - VSCode Missing Features (compared to WebStorm)
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

