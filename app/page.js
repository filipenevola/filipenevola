import Image from 'next/image';
import { Layout } from '../components/layout';
import { NewsletterCTA } from '../components/NewsletterSubscribe';

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
          <p className="text-neutral-300">
            I am also writing{' '}
            <a href="https://foroneperson.com" className="underline text-white hover:text-neutral-400">
              For One Person
            </a>
            , a living book about the mental models I use to build, decide, lead,
            live, and protect what matters.
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

