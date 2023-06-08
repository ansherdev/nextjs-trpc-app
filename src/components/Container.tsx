'use client';

import { ContainerProps, Container as ChakraContainer } from '@chakra-ui/react';

export const Container = (props: ContainerProps) => {
  return <ChakraContainer {...props}>{props.children}</ChakraContainer>;
};
