import React, { Fragment } from "react";

import { Layout } from "../components/layout";
import { Content } from "../components/content";

const TEXT = {
  en: {
    soon: key => <p key={key}>Coming soon ...</p>
  },
  pt: {
    soon: key => <p key={key}>Em breve ...</p>
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
