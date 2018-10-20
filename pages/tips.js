import React, { Fragment } from "react";

import { Layout } from "../components/layout";
import { Content } from "../components/content";

const TEXT = {
  en: {
    0: key => (
      <Fragment key={key}>
        <a href="https://twitter.com/i/moments/1053667928749600768">
          For previous tips click here to see Tweets with them
        </a>
        <br />
        <br />
        For future tips subscribe below
      </Fragment>
    )
  },
  pt: {
    0: key => (
      <Fragment key={key}>
        <a href="https://twitter.com/i/moments/1053667928749600768">
          Para dicas passadas clique aqui para ver os Tweets
        </a>
        <br />
        <br />
        Para dicas futuras se inscreva abaixo
      </Fragment>
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
