import { Button, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormPasswordInput } from 'components';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RegisterFormData } from './types';

const registerFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmedPassword: z.string(),
});

export const RegisterForm = () => {
  const { register } = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmedPassword: '',
    },
    resolver: zodResolver(registerFormSchema),
  });

  return (
    <form>
      <Stack spacing={5}>
        <FormInput
          inputProps={{
            type: 'text',
            placeholder: 'Name',
            autoComplete: 'username',
            ...register('name'),
          }}
        />
        <FormInput
          inputProps={{
            type: 'email',
            placeholder: 'E-mail',
            autoComplete: 'email',
            ...register('email'),
          }}
        />
        <FormPasswordInput
          inputProps={{
            placeholder: 'Password',
            autoComplete: 'new-password',
            ...register('password'),
          }}
        />
        <FormPasswordInput
          inputProps={{
            placeholder: 'Confirm Password',
            autoComplete: 'new-password',
            ...register('confirmedPassword'),
          }}
        />
        <Button>Register</Button>
      </Stack>
    </form>
  );
};
