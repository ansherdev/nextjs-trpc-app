import { Button, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormPasswordInput } from 'components';
import { useForm } from 'react-hook-form';
import { IRegisterInput, registerSchema } from 'schemas';
import { trpc } from 'utils';

export const RegisterForm = () => {
  const { mutate: registerUser } = trpc.register.useMutation();

  const { register, handleSubmit } = useForm<IRegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (input: IRegisterInput) => {
    registerUser(input);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <FormInput
          inputProps={{
            type: 'text',
            placeholder: 'Name',
            ...register('name'),
          }}
        />
        <FormInput
          inputProps={{
            type: 'email',
            placeholder: 'E-mail',
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
        <Button type="submit">Register</Button>
      </Stack>
    </form>
  );
};
