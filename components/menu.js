import React from "react";

import Link from "next/link";
import { useRouter } from 'next/router'


import { PAGES, PAGES_TEXT } from "./layout";

export const Menu = ({ toggleMenu, language }) => {
  const router = useRouter()
  return (
    <div>
      <nav className="flex justify-around space-x-2">
        {PAGES.filter(page => {
          return router.pathname !== page.route;
        }).map(page => (
          <Link href={page.route} key={page.route}>
            {PAGES_TEXT[language][page.nameKey]}
          </Link>
        ))}
        <a onClick={toggleMenu} className="text-xs self-center no-underline">x</a>
      </nav>
    </div>
  );
};
