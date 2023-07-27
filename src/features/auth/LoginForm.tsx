import { Button, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormPasswordInput } from 'components';
import { useForm } from 'react-hook-form';
import { ILoginInput, loginSchema } from 'schemas';
import { useLoginMutation } from './hooks';

export const LoginForm = () => {
  const { mutate: loginUser } = useLoginMutation();

  const { register, handleSubmit } = useForm<ILoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (input: ILoginInput) => {
    loginUser(input);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <FormInput
          inputProps={{
            placeholder: 'E-mail',
            autoComplete: 'email',
            type: 'email',
            ...register('email'),
          }}
        />
        <FormPasswordInput
          inputProps={{
            placeholder: 'Password',
            autoComplete: 'current-password',
            ...register('password'),
          }}
        />
        <Button type="submit">Login</Button>
      </Stack>
    </form>
  );
};
