import { ILoginInput, IRegisterInput } from 'schemas';
import { createUser } from 'server/services';

export const registerController = (input: IRegisterInput) => {
  createUser(input).then((user) => console.log('created user:', user));
};

export const loginController = (input: ILoginInput) => {
  console.log(input);
};
