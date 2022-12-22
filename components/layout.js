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
    <div className="h-full my-16 mx-6 md:mx-12">
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
        <div className="justify-center flex gap-x-4 mt-16">
          <a
            href="https://twitter.com/FilipeNevola"
            className="underline">Twitter</a>
          <a
            href="https://instagram.com/FilipeNevola"
            className="underline">Instagram</a>
          <a
            href="https://linkedin.com/in/FilipeNevola"
            className="underline">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

export const Layout = LayoutComponent;
