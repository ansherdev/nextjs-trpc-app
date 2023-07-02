import { Prisma } from '.prisma/client';
import { serverConfig } from 'server/config/default';
import { TokenKey } from 'server/config/types';
import { prisma } from 'server/prisma';
import { signJwt } from 'server/utils';

export const createUser = async (input: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: {
      ...input,
    },
  });
};

export const signTokens = async (input: Prisma.UserCreateInput) => {
  const accessToken = signJwt(input, TokenKey.AccessTokenPrivateKey, {
    expiresIn: `${serverConfig.accessTokenExpiresIn}m`,
  });

  const refreshToken = signJwt(input, TokenKey.RefreshTokenPrivateKey, {
    expiresIn: `${serverConfig.refreshTokenExpiresIn}m`,
  });

  return { accessToken, refreshToken };
};
