import { Prisma, User } from '.prisma/client';
import { prisma } from 'server/prisma';

export const createUser = async (input: Prisma.UserCreateInput) => {
  console.log('before create user:', input);

  return await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: input.password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });
};
