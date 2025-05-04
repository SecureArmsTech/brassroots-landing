// src/pages/_app.tsx

// Import global styles and types for your Next.js app
import "@/styles/globals.css";
import type { AppProps } from "next/app";

// Import the <Head> component to manually inject scripts into the HTML <head>
import Head from "next/head";

// Import Next.js's <Script> component (used for GTM only in this setup)
import Script from "next/script";

// Import your custom attribution hook to capture traffic sources (e.g. utm_source)
import { useChannelAttribution } from "@/hooks/useChannelAttribution";

export default function App({ Component, pageProps }: AppProps) {
  // This hook sets or updates `br_src` in localStorage based on UTM parameters
  useChannelAttribution();

  return (
    <>
      {/*Plausible Analytics Script
          We're using <Head> instead of <Script> because the site uses static export (`next export`).
          <Script> can fail to inject properly in statically exported HTML.
      */}
      <Head>
        <script
          defer
          data-domain="brassroots.market" // Hardcoded domain ensures tracking works even if env vars are missing
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Head>

      {/*Google Tag Manager (GTM) Script
          This uses the Next.js <Script> component because GTM relies on runtime execution.
      */}
      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}
      </Script>

      {/*Main App Component
          This renders your actual pages (e.g. the landing page and signup form)
      */}
      <Component {...pageProps} />
    </>
  );
}
