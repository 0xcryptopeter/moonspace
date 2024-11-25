import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/moonspace-logo.png" />
        <meta name="description" content="Moonspace - Community-Driven Fitness Challenge Platform" />
        <meta name="theme-color" content="#00E5FF" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 