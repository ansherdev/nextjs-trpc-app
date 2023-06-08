import { Container } from 'components';
import { theme } from 'theme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Container minHeight="100vh">{children}</Container>
      </ChakraProvider>
    </CacheProvider>
  );
};
