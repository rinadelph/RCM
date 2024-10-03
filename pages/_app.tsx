import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '../utils/chartConfig';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;