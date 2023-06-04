import { Providers } from './providers';

export const metadata = {
  title: 'Auth with Next.js + Chakra UI + tRPC',
  description: 'Training full-stack project',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
