import React from "react";

import Link from "next/link";
import { withRouter } from "next/router";

import { PAGES, PAGES_TEXT } from "./layout";

export const Menu = withRouter(({ router, toggleMenu, language }) => (
  <div>
    <nav className="menu">
      {PAGES.filter(page => {
        return router.pathname !== page.route;
      }).map(page => (
        <Link href={page.route} key={page.route}>
          <a
            onClick={toggleMenu}
            className={`menu-item ${
              router.pathname === page.route ? "menu-item-active" : ""
            }`}
          >
            {PAGES_TEXT[language][page.nameKey]}
          </a>
        </Link>
      ))}
      <a onClick={toggleMenu}>x</a>
    </nav>
    {/*language=CSS*/}
    <style jsx>{`
      .menu {
        display: flex;
        justify-content: space-around;
      }

      .menu-item {
        position: relative;
        color: #eee;
        text-transform: uppercase;

        font-size: 0.8em;

        margin: 0 15px;
      }

      @media (min-width: 600px) {
        .menu-item {
          font-size: 0.9em;
        }
      }

      @media (min-width: 960px) {
        .menu-item {
          font-size: 1em;
        }
      }

      .menu-item:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #eee;
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
      }

      .menu-item:hover:before {
        visibility: visible;
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
      }

      .menu-item-active:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #eee;
        visibility: visible;
        transform: scaleX(1);
      }
    `}</style>
  </div>
));
