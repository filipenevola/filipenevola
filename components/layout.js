import React, {useEffect, useState} from "react";

import Link from "next/link";
import Head from "next/head";
import {useRouter} from "next/router";
import {initGA, logPageView} from "../utils/analytics";


const LayoutComponent = ({children}) => {
  const router = useRouter();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, [])

  return (
    <div className="h-full m-16">
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
        <div className="flex justify-center">
          <h1 className="text-xl font-semibold mb-2">
            {router.pathname === "/" && (
              <Link href="/">
                Filipe Névola
              </Link>
            )}
          </h1>
        </div>
      </header>
      {children}
      <footer>
      </footer>
    </div>
  );
}

export const Layout = LayoutComponent;
