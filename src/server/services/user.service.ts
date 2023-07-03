import { Prisma } from '.prisma/client';
import { User } from '@prisma/client';
import { serverConfig } from 'server/config/default';
import { TokenKey } from 'server/config/types';
import { prisma } from 'server/prisma';
import { signJwt } from 'server/utils';

export const createUser = async (input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: {
      ...input,
    },
  })) as User;
};

export const findUser = async (
  where: Partial<Prisma.UserCreateInput>,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findFirst({ where, select })) as User;
};

export const signTokens = (input: Prisma.UserCreateInput) => {
  const accessToken = signJwt(input, TokenKey.AccessTokenPrivateKey, {
    algorithm: 'RS512',
    expiresIn: `${serverConfig.accessTokenExpiresIn}m`,
  });

  const refreshToken = signJwt(input, TokenKey.RefreshTokenPrivateKey, {
    algorithm: 'RS512',
    expiresIn: `${serverConfig.refreshTokenExpiresIn}m`,
  });

  return { accessToken, refreshToken };
};
1
