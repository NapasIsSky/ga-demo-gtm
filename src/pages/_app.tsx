import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import TagManager from "react-gtm-module";

import "@/styles/globals.css";
import AppProvider from "@/context";

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-PQJJTQT" });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </React.Fragment>
  );
}
