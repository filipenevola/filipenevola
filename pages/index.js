import React, {Fragment} from "react";

import {Layout} from "../components/layout";
import {Content} from "../components/content";

const TEXT = {
  en: {
    intro: key => (
      <p key={key}>
        Subscribe to my channel <a
        href="https://www.youtube.com/c/HowToCreateAnAppDev">"How to create an
        app"</a>: Every day a new video. (<a
        href="https://www.youtube.com/channel/UCZo_DmCzwmxMtv5Kv_dukpA">Portuguese
        channel</a>)<br/><br/>
        <a href="https://twitter.com/meteorjs">Meteor</a> Evangelist, Developer
        & Instructor trying to be better every day, founder of{" "}
        <a href="https://twitter.com/FTW_Code">CodeFTW</a> &{" "}
        <a href="https://twitter.com/quaveDev">Quave</a>.
      </p>
    )
  },
  pt: {
    intro: key => (
      <p key={key}>
        Se inscreva no meu canal <a
        href="https://www.youtube.com/channel/UCZo_DmCzwmxMtv5Kv_dukpA">"Como criar um app"</a>: Todo dia um vídeo novo. (<a
        href="https://www.youtube.com/c/HowToCreateAnAppDev">English
        channel</a>)<br/><br/>
        Evangelista do <a href="https://twitter.com/meteorjs">Meteor</a>,
        Desenvolvedor e Instrutor tentando ser melhor todos os dias, fundador
        do{" "}
        <a href="https://twitter.com/FTW_Code">CodeFTW</a> &{" "}
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
