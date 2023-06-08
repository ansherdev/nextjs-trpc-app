import { Button, FormControl, Input, Stack } from '@chakra-ui/react';

export const RegisterForm = () => {
  return (
    <form>
      <Stack spacing={5}>
        <FormControl>
          <Input placeholder="Name" />
        </FormControl>
        <FormControl>
          <Input placeholder="E-mail" />
        </FormControl>
        <FormControl>
          <Input placeholder="Password" />
        </FormControl>
        <FormControl>
          <Input placeholder="Confirm Password" />
        </FormControl>
        <Button>Register</Button>
      </Stack>
    </form>
  );
};
