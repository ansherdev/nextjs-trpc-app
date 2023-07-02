import { ServerConfig } from './types';

export const serverConfig: ServerConfig = {
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  accessTokenPrivateKey: process.env.AUTH_TOKEN_PRIVATE_KEY as string,
  accessTokenPublicKey: process.env.AUTH_TOKEN_PUBLIC_KEY as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
};
