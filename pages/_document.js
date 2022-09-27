import {Html, Head, Main, NextScript} from 'next/document'
import React from "react";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico"/>
        <link
          href="https://fonts.googleapis.com/css?family=K2D"
          rel="stylesheet"
        />
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}
