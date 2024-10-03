import { AnalyticsProvider } from '../contexts/AnalyticsContext';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AnalyticsProvider>
        <Component {...pageProps} />
      </AnalyticsProvider>
    </SessionProvider>
  );
}

export default MyApp;