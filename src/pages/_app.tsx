import { RootLayout } from 'layouts';
import { AppProps } from 'next/app';
import { trpc } from 'utils';

function App({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default trpc.withTRPC(App);
