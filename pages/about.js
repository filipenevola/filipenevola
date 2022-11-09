import React from "react";

import { Layout } from "../components/layout";

const TEXT = {
  en: {
    me: key => (
      <p key={key}>
        I'm Filipe Névola, a developer and instructor always looking for new
        technologies that bring more practical results, working with Javascript
        and Java for more than 10 years, working remotely since 2010 living in
        23 different countries, and I already act on many roles in software
        developer and team leadership. I have a bachelor in Computer Science
        (UEMS).
      </p>
    ),
    talks: key => (
      <p key={key}>
        I also like to disseminate knowledge giving talks. In 2013 I founded
        Quave, a development and teaching company. In 2017 I founded{" "}
        <a href="https://en.codeftw.dev">en.CodeFTW.dev</a> that is a group of people
        who believes code can change lives.
      </p>
    ),
    work: key => (
      <p key={key}>Currently I'm Quave's CEO and I produce content on CodeFTW.</p>
    )
  },
  pt: {
    me: key => (
      <p key={key}>
        Sou Filipe Névola, um desenvolvedor e instrutor sempre buscando novas
        tecnologias que tragam resultados práticos, atuo com Javascript e Java
        há mais de 10 anos, desde 2010 eu trabalho em regime home-office
        morando em 23 países neste período, já desempenhei variados papéis em
        desenvolvimento de software e liderança de equipes. Possuo graduação em
        Ciência da Computação pela UEMS.
      </p>
    ),
    talks: key => (
      <p key={key}>
        Gosto de disseminar conhecimento através de palestras, já palestrei de
        eventos bem interessantes como TDC e QCon. Em 2017 fundei o{" "}
        <a href="https://codeftw.com">CodeFTW.dev</a>, um grupo de pessoas que
        acreditam que código pode transformar realidades.
      </p>
    ),
    work: key => (
      <p key={key}>
        Sou CEO da Quave e produzo conteúdo para o CodeFTW.
      </p>
    )
  }
};
const About = () => (
  <Layout>
    {({ language }) => (
      <div className="text-wrap">
        <div className="text small-text">
          {Object.entries(TEXT[language]).map(([key, Text]) => (
            <Text key={key} />
          ))}
        </div>
      </div>
    )}
  </Layout>
);

export default About;
