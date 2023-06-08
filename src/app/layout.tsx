import { Container } from 'components';
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
        <Providers>
          <Container minHeight="100vh">
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
