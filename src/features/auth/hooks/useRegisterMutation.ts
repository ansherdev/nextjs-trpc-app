import { useStatusToast } from 'hooks';
import { trpc } from 'utils';

export const useRegisterMutation = () => {
  const mutation = trpc.register.useMutation();

  useStatusToast({
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    toastErrorOptions: {
      title: 'Registration error',
      description: mutation.error?.message,
      status: 'error',
    },
    toastSuccessOptions: {
      title: 'Registration success',
      description: 'User created',
      status: 'success',
    },
  });

  return mutation;
};
