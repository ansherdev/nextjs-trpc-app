import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import { ILoginInput, IRegisterInput } from 'schemas';
import { serverConfig } from 'server/config/default';
import { Context } from 'server/context';
import { redisClient } from 'server/redis';
import { userService } from 'server/services';
import { findUser, signTokens } from 'server/services/user.service';

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
      input.password,
      user.password
    );

    if (!user || !verifiedPassword) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid e-mail or password',
      });
    }

    const { accessToken, refreshToken } = userService.signTokens(user);

    setCookie('access_token', accessToken, {
      req,
      res,
      ...accessTokenCookieOptions,
    });

    setCookie('refresh_token', refreshToken, {
      req,
      res,
      ...refreshTokenCookieOptions,
    });

    setCookie('logged_in', 'true', {
      req,
      res,
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return {
      status: 'success',
      accessToken,
    };
  } catch (error) {
    throw error;
  }
};
