// src/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useChannelAttribution } from "@/hooks/useChannelAttribution";

export default function App({ Component, pageProps }: AppProps) {
  // Capture the channel/source on first visit
  useChannelAttribution();

  return (
    <>
      {/* Plausible Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://plausible.io/js/plausible.js`}
        data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
      />

      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}
