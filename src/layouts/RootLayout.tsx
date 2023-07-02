import { ChakraProvider, Container } from '@chakra-ui/react';
import { theme } from 'theme';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
      <ChakraProvider theme={theme}>
        <Container minHeight="100vh">{children}</Container>
      </ChakraProvider>
  );
};
