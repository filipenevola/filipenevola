import React, { Fragment } from "react";

import { Layout } from "../components/layout";
import { Content } from "../components/content";

const TEXT = {
  en: {
    intro: key => (
      <p key={key}>
        <a href="https://twitter.com/meteorjs">Meteor</a> Evangelist, Developer
        & Instructor trying to be better every day, founder of{" "}
        <a href="https://twitter.com/FTW_Code">CodeFTW</a> &{" "}
        <a href="https://twitter.com/quaveDev">Quave</a>,{" "}
        <a href="https://twitter.com/Pathable">Pathable</a>
        's Contractor
      </p>
    )
  },
  pt: {
    intro: key => (
      <p key={key}>
        Evangelista do <a href="https://twitter.com/meteorjs">Meteor</a>,
        Desenvolvedor e Instrutor tentando ser melhor todos os dias, fundador do{" "}
        <a href="https://twitter.com/FTW_Code">CodeFTW</a> &{" "}
        <a href="https://twitter.com/quaveDev">Quave</a>, Trabalhando pra{" "}
        <a href="https://twitter.com/Pathable">Pathable</a>
      </p>
    )
  }
};
export default () => (
  <Layout>
    {({ language }) => (
      <Fragment>
        <Content language={language} text={TEXT} />
      </Fragment>
    )}
  </Layout>
);
