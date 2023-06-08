import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

interface FormInputProps {
  formControlProps?: FormControlProps;
  inputProps?: Omit<InputProps, 'type'>;
  label?: string | ReactNode;
  helperText?: string | ReactNode;
  errorMessage?: string | ReactNode;
}

export const FormPasswordInput = ({
  formControlProps,
  inputProps,
  label,
  helperText,
  errorMessage,
}: FormInputProps) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleClick = () => {
    setIsShow((show) => !show);
  };

  return (
    <FormControl {...formControlProps}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Input type={isShow ? 'text' : 'password'} {...inputProps} />
        <InputRightElement>
          <IconButton
            aria-label="Toggle password visibility"
            variant="ghost"
            size="sm"
            icon={<Icon boxSize={5} as={isShow ? IoIosEyeOff : IoIosEye} />}
            onClick={handleClick}
          />
        </InputRightElement>
      </InputGroup>
      {errorMessage ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : (
        helperText && <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
