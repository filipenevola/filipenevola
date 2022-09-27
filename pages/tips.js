import React, { Fragment } from "react";

import { Layout } from "../components/layout";
import { Content } from "../components/content";

const TEXT = {
  en: {
    0: key => (
      <Fragment key={key}>
        Subscribe below
      </Fragment>
    )
  },
  pt: {
    0: key => (
      <Fragment key={key}>
        Se inscreva abaixo
      </Fragment>
    )
  }
};
const Tips = () => (
  <Layout>
    {({ language }) => (
      <Fragment>
        <Content language={language} text={TEXT} />
      </Fragment>
    )}
  </Layout>
);

export default Tips;
