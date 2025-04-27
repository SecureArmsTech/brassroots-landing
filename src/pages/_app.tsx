import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useChannelAttribution } from "@/hooks/useChannelAttribution";

export default function App({ Component, pageProps }: AppProps) {
  // Capture the channel/source on first visit
  useChannelAttribution();

  return <Component {...pageProps} />;
}
