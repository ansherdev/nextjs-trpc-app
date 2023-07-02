import { UseToastOptions, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { trpc } from 'utils';

interface UseStatusToastOptions {
  isSuccess: boolean;
  isError: boolean;
  toastErrorOptions?: UseToastOptions;
  toastSuccessOptions?: UseToastOptions;
}

export const useStatusToast = ({
  isError,
  isSuccess,
  toastErrorOptions,
  toastSuccessOptions,
}: UseStatusToastOptions) => {
  const toast = useToast();

  useEffect(() => {
    if (isError && toastErrorOptions) {
      toast(toastErrorOptions);
    }
  }, [isError, toastErrorOptions]);

  useEffect(() => {
    if (isSuccess && toastSuccessOptions) {
      toast(toastSuccessOptions);
    }
  }, [isSuccess, toastSuccessOptions]);
};
