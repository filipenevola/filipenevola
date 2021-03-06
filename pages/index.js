import React, {Fragment} from "react";

import {Layout} from "../components/layout";
import {Content} from "../components/content";

const TEXT = {
  en: {
    intro: key => (
      <p key={key}>
        Subscribe to my English channel <a
        href="https://www.youtube.com/c/HowToCreateAnAppDev">"How to create an
        app"</a>: New videos every Monday, Wednesday and
        Friday.<br/><br/>Prefer Portuguese? Subscribe to my Portuguese
        channel <a
        href="https://www.youtube.com/channel/UCZo_DmCzwmxMtv5Kv_dukpA">"Como
        Criar um App"</a>: News videos every Tuesday and
        Thursday.<br/><br/>
        I also have a <a
        href="https://www.youtube.com/channel/UCAfhf9uh1osU2CW0fKrZ8xA">channel</a> about
        business but only in Portuguese.<br/><br/>
        <a href="https://twitter.com/meteorjs">Meteor</a>'s CEO, Developer
        & Instructor trying to be better every day, founder of{" "}
        <a href="https://twitter.com/quaveDev">Quave</a>.
      </p>
    )
  },
  pt: {
    intro: key => (
      <p key={key}>
        Se inscreva no meu canal <a
        href="https://www.youtube.com/channel/UCZo_DmCzwmxMtv5Kv_dukpA">"Como
        criar um app"</a>: Toda Terça e Quinta um vídeo novo.<br/><br/>Prefere
        Inglês? Se inscreva no meu canal em Inglês <a
        href="https://www.youtube.com/c/HowToCreateAnAppDev">"How to Create an
        App"</a>: Toda Segunda, Quarta e Sexta um vídeo novo.<br/><br/>
        Vamos conversar sobre Negócios? <a
        href="https://www.youtube.com/channel/UCAfhf9uh1osU2CW0fKrZ8xA">"Provocações
        sobre Negócios"</a> é o meu canal onde falo sobre Dinheiro e Negócios de
        uma forma diferente.<br/><br/>
        CEO do <a href="https://twitter.com/meteorjs">Meteor</a>,
        Desenvolvedor e Instrutor tentando ser melhor todos os dias, fundador
        da{" "}
        <a href="https://twitter.com/quaveDev">Quave</a>.
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
