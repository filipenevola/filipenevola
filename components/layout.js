import React, { Component } from "react";

import Link from "next/link";
import Head from "next/head";
import { Menu } from "./menu";
import * as PropTypes from "prop-types";
import { withRouter } from "next/dist/lib/router";
import { Mailchimp } from "./mailchimp";

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
  { route: "/", nameKey: "home" },
  { route: "/about", nameKey: "about" },
  { route: "/tips", nameKey: "tips" },
  { route: "https://medium.com/@filipenevola", nameKey: "blog" },
  { route: "/contact", nameKey: "contact" }
];
const baseTitle = "Filipe Névola";

class LayoutComponent extends Component {
  state = {
    menuOpened: false,
    language: "en"
  };

  toggleMenu = () =>
    this.setState(({ menuOpened }) => {
      return { menuOpened: !menuOpened };
    });

  toggleLanguage = () =>
    this.setState(({ language }) => {
      return { language: language === "en" ? "pt" : "en" };
    });

  render() {
    let { children, title, router } = this.props;

    return (
      <div className="site">
        <Head>
          <title>
            {baseTitle === title ? baseTitle : `${title}: ${baseTitle}`}
          </title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=K2D"
            rel="stylesheet"
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
              <div className="language" onClick={this.toggleLanguage}>
                <a>{this.state.language}</a>
              </div>
            </div>
            <h1 className="logo">
              {router.pathname === "/" && (
                <Link href="/">
                  <a>Filipe Névola</a>
                </Link>
              )}
              {router.pathname !== "/" &&
                PAGES_TEXT[this.state.language][
                  PAGES.find(page => page.route === router.pathname).nameKey
                ]}
            </h1>
          </div>
        </header>

        <div className="content">
          {children({ language: this.state.language })}
          <Mailchimp language={this.state.language} />
        </div>

        <footer>
          <div className="footer">
            <div
              className={`menu ${this.state.menuOpened && "menu-opened"}`}
              onClick={this.state.menuOpened ? () => {} : this.toggleMenu}
            >
              {!this.state.menuOpened && "menu"}
              {this.state.menuOpened && (
                <div>
                  <Menu
                    toggleMenu={this.toggleMenu}
                    language={this.state.language}
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
              text-decoration: none;
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
}

LayoutComponent.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string
};

LayoutComponent.defaultProps = { title: baseTitle };

export const Layout = withRouter(LayoutComponent);
