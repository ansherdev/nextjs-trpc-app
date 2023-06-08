import { Button, FormControl, Input, Stack } from '@chakra-ui/react';

export const LoginForm = () => {
  return (
    <form>
      <Stack spacing={5}>
        <FormControl>
          <Input placeholder="E-mail" />
        </FormControl>
        <FormControl>
          <Input placeholder="Password" />
        </FormControl>
        <Button>Login</Button>
      </Stack>
    </form>
  );
};
