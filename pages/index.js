import React, {Fragment} from "react";

import {Layout} from "../components/layout";
import {Content} from "../components/content";

const TEXT = {
  en: {
    intro: key => (
      <p key={key}>
        Subscribe to my English channel <a
        href="https://www.youtube.com/c/HowToCreateAnAppDev">"How to create an
        app" by clicking here</a>: New videos every Monday, Wednesday and Friday.<br/><br/>Prefer Portuguese? Subscribe to my Portuguese channel <a
        href="https://www.youtube.com/channel/UCZo_DmCzwmxMtv5Kv_dukpA">"Como Criar um App" by clicking here: News videos every Tuesday and Thursday.</a><br/><br/>
        <a href="https://twitter.com/meteorjs">Meteor</a> Evangelist, Developer
        & Instructor trying to be better every day, founder of{" "}
        <a href="https://twitter.com/quaveDev">Quave</a>.
      </p>
    )
  },
  pt: {
    intro: key => (
      <p key={key}>
        Se inscreva no meu canal <a
        href="https://www.youtube.com/channel/UCZo_DmCzwmxMtv5Kv_dukpA">"Como criar um app" clicando aqui</a>: Toda Terça e Quinta um vídeo novo.<br/><br/>Prefere Inglês? Se inscreva no meu canal em Inglês <a
        href="https://www.youtube.com/c/HowToCreateAnAppDev">"How to Create an App" clicando aqui</a>: Toda Segunda, Quarta e Sexta um vídeo novo.<br/><br/>
        Evangelista do <a href="https://twitter.com/meteorjs">Meteor</a>,
        Desenvolvedor e Instrutor tentando ser melhor todos os dias, fundador
        da{" "}
        <a href="https://twitter.com/quaveDev">Quave</a>.
      </p>
    )
  }
};
export default () => (
  <Layout>
    {({language}) => (
      <Fragment>
        <Content language={language} text={TEXT}/>
      </Fragment>
    )}
  </Layout>
);
