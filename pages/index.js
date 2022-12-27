import React, {Fragment} from "react";

import Image from 'next/image';
import {Layout} from "../components/layout";

const Index = () => (
  <Layout>
    <div
      className="flex flex-col justify-center items-center space-y-4 w-full md:w-3/4 xl:w-1/2">
      <div className="justify-center flex">
        <div className="w-3/4 md:w-5/6 justify-center flex">
          <Image src="/static/perfil2022.jpg" width="200"
                 height="200" className="rounded-2xl"/>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <p>I'm Filipe Névola, and I'm <a
          href="https://quave.dev"
          className="underline">Quave</a>'s CEO, Developer & Instructor trying
          to be better every day.</p>

        <p>Learn how to code at <a
          href="https://codeftw.dev"
          className="underline">CodeFTW</a> (Portuguese)
          and <a href="https://en.codeftw.dev"
                 className="underline">CodeFTW</a> (English).</p>

        <p>Right now I'm working in a new web app called <a
          href="https://lemeno.io" className="underline">Lemeno</a>.</p>

        <p>Are you a nerd? Check this <a
          href="https://www.lemeno.io/nerds" className="underline">page</a>. Or
          if you are a creator, <a
            href="https://www.lemeno.io/creators"
            className="underline">this</a> is for you.</p>
      </div>
      <div className="font-semibold pt-4">
        Articles
      </div>
      <ul
        className="space-y-2">
        <li><a
          href="https://medium.com/@filipenevola/how-to-migrate-to-mono-repository-without-losing-any-git-history-7a4d80aa7de2"
          target="_blank">- How to migrate to Mono Repository without losing any Git history</a></li>
        <li><a
          href="https://medium.com/@filipenevola/vscode-missing-features-837a6bd660ca"
          target="_blank">- VSCode
          Missing Features (compared to WebStorm)</a></li>
      </ul>
    </div>
  </Layout>
);

export default Index;
