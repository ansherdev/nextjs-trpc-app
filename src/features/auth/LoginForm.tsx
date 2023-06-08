import { Button, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormPasswordInput } from 'components';
import { useForm } from 'react-hook-form';
import { LoginFormData } from 'types';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const LoginForm = () => {
  const { register } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginFormSchema),
  });

  return (
    <form>
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
        <Button>Login</Button>
      </Stack>
    </form>
  );
};
