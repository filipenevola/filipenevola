import React, { Fragment } from "react";

import { Layout } from "../components/layout";
import { Content } from "../components/content";

const TEXT = {
  en: {
    intro: key => (
      <p key={key}>
        Developer & Instructor trying to be better every day, Working for{" "}
        <a href="https://twitter.com/Pathable">Pathable</a>, founder of{" "}
        <a href="https://twitter.com/FTW_Code">CodeFTW</a> &{" "}
        <a href="https://twitter.com/QuaveTI">Quave</a>. Enthusiast of{" "}
        <a href="https://twitter.com/meteorjs">MeteorJS</a>
      </p>
    )
  },
  pt: {
    intro: key => (
      <p key={key}>
        Desenvolvedor e Instrutor tentando ser melhor todos os dias, Trabalhando
        para a <a href="https://twitter.com/Pathable">Pathable</a>, fundador do
        <a href="https://twitter.com/FTW_Code">CodeFTW</a> e{" "}
        <a href="https://twitter.com/QuaveTI">Quave</a>. Entusiata de{" "}
        <a href="https://twitter.com/meteorjs">MeteorJS</a>
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
