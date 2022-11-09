import React, {Fragment} from "react";

import {Layout} from "../components/layout";
import {Content} from "../components/content";

const TEXT = {
  en: {
    intro: key => (
      <p key={key}>
        Subscribe to my English channel <a
        href="https://en.codeftw.dev/y">"CodeFTW"</a>.<br/><br/>Prefer Portuguese? Subscribe to my Portuguese
        channel <a
        href="https://codeftw.dev/y">"CodeFTW"</a>.<br/><br/>
        <a href="https://twitter.com/quaveDev">Quave</a>'s CEO, Developer
        & Instructor trying to be better every day.
      </p>
    )
  },
  pt: {
    intro: key => (
      <p key={key}>
        Se inscreva no meu canal <a
        href="https://codeftw.dev/y">"CodeFTW"</a>.<br/><br/>Prefere
        Inglês? Se inscreva no meu canal em Inglês <a
        href="https://en.codeftw.dev/y">"CodeFTW"</a>.<br/><br/>
        CEO da <a href="https://twitter.com/quaveDev">Quave</a>,
        Desenvolvedor e Instrutor tentando ser melhor todos os dias.
      </p>
    )
  }
};
const Index = () => (
  <Layout>
    {({language}) => (
      <Fragment>
        <Content language={language} text={TEXT}/>
      </Fragment>
    )}
  </Layout>
);

export default Index;
