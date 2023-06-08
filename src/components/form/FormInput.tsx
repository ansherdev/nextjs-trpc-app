import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface FormInputProps {
  formControlProps?: FormControlProps;
  inputProps?: InputProps;
  label?: string | ReactNode;
  helperText?: string | ReactNode;
  errorMessage?: string | ReactNode;
}

export const FormInput = ({
  formControlProps,
  inputProps,
  label,
  helperText,
  errorMessage,
}: FormInputProps) => {
  return (
    <FormControl {...formControlProps}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input {...inputProps} />
      {errorMessage ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
