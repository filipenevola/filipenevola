import React, {Fragment} from "react";

import {Layout} from "../components/layout";
import {Content} from "../components/content";

const TEXT = {
  en: {
    email: key => <p key={key}>Reach me by email filipe@quave.dev</p>,
    discord: key => <p key={key}>or if you have a question join my <a
      href="https://en.codeftw.dev/d">Discord</a></p>
  },
  pt: {
    email: key => <p key={key}>Me envie um email filipe@quave.dev</p>,
    discord: key => <p key={key}>ou se você tem uma dúvida, entre no meu <a
      href="https://www.codeftw.dev/d">Discord</a></p>
  }
};
const Contact = () => (
  <Layout>
    {({language}) => (
      <Fragment>
        <Content language={language} text={TEXT}/>
      </Fragment>
    )}
  </Layout>
);

export default Contact;
