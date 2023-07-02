import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { ILoginInput, IRegisterInput } from 'schemas';
import { userService } from 'server/services';

export const registerHandler = async (input: IRegisterInput) => {
  try {
    const hashedPassword = await bcrypt.hash(input.password, 12);

    const user = await userService.createUser({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });


    return { status: 'success', data: { user } };
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'E-mail already exists',
      });
    }
  }
};

export const loginHandler = (input: ILoginInput) => {
  console.log(input);
};
