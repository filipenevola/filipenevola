import React, {useEffect, useState} from "react";

import Link from "next/link";
import Head from "next/head";
import {Menu} from "./menu";
import {withRouter} from "next/router";
import {Mailchimp} from "./mailchimp";
import {initGA, logEvent, logPageView} from "../utils/analytics";

export const PAGES_TEXT = {
  en: {
    home: "Home",
    about: "About",
    tips: "Tips",
    blog: "Blog",
    contact: "Contact"
  },
  pt: {
    home: "Início",
    about: "Sobre",
    tips: "Dicas",
    blog: "Blog",
    contact: "Contato"
  }
};
export const PAGES = [
  {route: "/", nameKey: "home"},
  {route: "/about", nameKey: "about"},
  {route: "/tips", nameKey: "tips"},
  {route: "https://medium.com/@filipenevola", nameKey: "blog"},
  {route: "/contact", nameKey: "contact"}
];

const LayoutComponent = ({children, router}) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, [])

  const toggleMenu = () =>
    setMenuOpened(!menuOpened)

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "pt" : "en";
    logEvent({
      category: "Navigation",
      action: "Change Language",
      label: newLanguage
    });
    setLanguage(newLanguage);
  };

  return (
    <div className="site">
      <Head>
        <title>
          Filipe Névola
        </title>
        <meta charSet="utf-8"/>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <header>
        <div className="header">
          <div
            className={`header-top ${
              router.pathname === "/"
                ? "header-top-home"
                : "header-top-not-home"
            }`}
          >
            {router.pathname !== "/" && (
              <div className="home">
                <Link href="/">
                  <a>FN</a>
                </Link>
              </div>
            )}
            <div className="language" onClick={toggleLanguage}>
              <a>{language}</a>
            </div>
          </div>
          <h1 className="logo">
            {router.pathname === "/" && (
              <Link href="/">
                <a>Filipe Névola</a>
              </Link>
            )}
            {router.pathname !== "/" &&
              PAGES_TEXT[language][
                PAGES.find(page => page.route === router.pathname).nameKey
                ]}
          </h1>
        </div>
      </header>

      <div className="content">
        {children({language: language})}
        <Mailchimp language={language}/>
      </div>

      <footer>
        <div className="footer">
          <div
            className={`menu ${menuOpened && "menu-opened"}`}
            onClick={menuOpened ? () => {
            } : toggleMenu}
          >
            {!menuOpened && "menu"}
            {menuOpened && (
              <div>
                <Menu
                  toggleMenu={toggleMenu}
                  language={language}
                />
              </div>
            )}
          </div>
        </div>
      </footer>

      {/*language=CSS*/}
      <style jsx>{`
        .site {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          min-height: 100vh;
        }

        .header {
          display: flex;
          flex-direction: column;
          justify-content: center;

          margin-bottom: 30px;
        }

        .header-top {
          display: flex;
        }

        .header-top-home {
          justify-content: flex-end;
        }

        .header-top-not-home {
          justify-content: space-between;
        }

        .home {
          cursor: pointer;
          text-transform: uppercase;
          padding: 10px 15px 8px 8px;
          border-bottom-right-radius: 15px;
          border-bottom: aliceblue 3px solid;
          border-right: aliceblue 3px solid;
        }

        .language {
          cursor: pointer;
          text-transform: uppercase;
          padding: 10px 8px 8px 15px;
          border-bottom-left-radius: 15px;
          border-bottom: aliceblue 3px solid;
          border-left: aliceblue 3px solid;
        }

        .logo {
          text-align: center;
          margin: 0;
        }

        .logo a {
          font-size: 1.5em;
          color: #eee;
        }

        .logo a,
        .logo a:hover,
        .logo a:visited,
        .logo a​:active {
          color: #eee;
        }

        .content {
          flex-grow: 1;

          margin-left: 15px;
          margin-right: 15px;
          text-align: justify;

          font-size: 1.2em;
        }

        .footer {
          display: flex;
          justify-content: center;

          margin-top: 10px;
        }

        .menu {
          cursor: pointer;
          text-transform: uppercase;
          padding: 10px 15px 8px 15px;
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
          border-top: aliceblue 3px solid;
          border-left: aliceblue 3px solid;
          border-right: aliceblue 3px solid;
        }
      `}</style>
      {/*language=CSS*/}
      <style global jsx>
        {`
          * {
            font-family: "K2D", sans-serif;
            background-color: #000;
            color: #eee;
            margin: 0;
            padding: 0;
          }

          ul {
            margin: 0;
            padding: 0;
          }

          a {
            text-decoration: underline;
            color: #eee;
          }

          a:hover,
          a:visited,
          a​:active {
            color: #eee;
          }

          .text-wrap {
            display: flex;
            justify-content: center;
          }

          .text {
            flex-basis: 90%;
            line-height: 1.5em;

            text-align: justify;
          }

          @media (min-width: 960px) {
            .text {
              flex-basis: 70%;

              font-size: 1.2em;
            }
          }

          .small-text {
            text-align: justify;
          }
        `}
      </style>
    </div>
  );
}

export const Layout = withRouter(LayoutComponent);
