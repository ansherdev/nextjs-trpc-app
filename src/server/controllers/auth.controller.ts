import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { getCookie, setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { ILoginInput, IRegisterInput } from 'schemas';
import { serverConfig } from 'server/config/default';
import { Context } from 'server/context';
import { userService } from 'server/services';

const cookieOptions: OptionsType = {
  httpOnly: true,
  sameSite: 'lax',
};

const accessTokenCookieOptions: OptionsType = {
  ...cookieOptions,
  expires: new Date(Date.now() + serverConfig.accessTokenExpiresIn * 60 * 1000),
};

const refreshTokenCookieOptions: OptionsType = {
  ...cookieOptions,
  expires: new Date(
    Date.now() + serverConfig.refreshTokenExpiresIn * 60 * 1000
  ),
};

export const setTokenCookies = ({
  accessToken,
  refreshToken,
  options,
}: {
  accessToken: string;
  refreshToken: string;
  options: OptionsType;
}) => {
  setCookie('access_token', accessToken, {
    ...options,
    ...accessTokenCookieOptions,
  });

  setCookie('refresh_token', refreshToken, {
    ...options,
    ...refreshTokenCookieOptions,
  });
};

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

export const loginHandler = async (
  input: ILoginInput,
  { req, res }: Context
) => {
  try {
    const user = await userService.findUser({ email: input.email });

    const verifiedPassword = await bcrypt.compare(
      input?.password,
      user?.password ?? ''
    );

    if (!user || !verifiedPassword) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid e-mail or password',
      });
    }

    const { accessToken, refreshToken } = userService.signTokens(user);

    setTokenCookies({
      accessToken,
      refreshToken,
      options: {
        req,
        res,
      },
    });

    return {
      status: 'success',
      accessToken,
    };
  } catch (error) {
    throw error;
  }
};

export const logoutHandler = ({ req, res }: {req: NextApiRequest, res: NextApiResponse}) => {
  setCookie('access_token', '', { req, res, maxAge: -1 });
  setCookie('refresh_token', '', { req, res, maxAge: -1 });
};

export const refreshTokenHandler = async ({ req, res }: Context) => {
  try {
    const refresh_token = getCookie('refresh_token', { req, res });

    if (!refresh_token) {
      logoutHandler({ req, res });
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Invalid refresh token',
      });
    }

    /* TODO: finish implementation */
  } catch (error) {
    throw error;
  }
};
