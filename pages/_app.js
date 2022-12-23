import '../styles/globals.css'

import {Analytics} from '@vercel/analytics/react';

import {K2D} from '@next/font/google'


// If loading a variable font, you don't need to specify the font weight
const font = K2D({
  weight: '400', subsets: ['latin']
})

function MyApp({Component, pageProps}) {

  return <main className={font.className}>
    <Component {...pageProps} />
    <Analytics/>
  </main>
}

export default MyApp
