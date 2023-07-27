import { useStatusToast } from 'hooks';
import { trpc } from 'utils';

export const useLoginMutation = () => {
  const mutation = trpc.login.useMutation();

  useStatusToast({
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    toastErrorOptions: {
      title: 'Login error',
      description: mutation.error?.message,
      status: 'error',
    },
    toastSuccessOptions: {
      title: 'Login success',
      description: 'You`re logged in',
      status: 'success',
    },
  });

  return mutation;
};
