import { TokenKey } from 'server/config/types';
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { serverConfig } from 'server/config/default';

const getTokenKeyFromConfig = (key: TokenKey) => {
  return Buffer.from(serverConfig[key], 'base64').toString('ascii');
};

export const signJwt = (
  payload: Object,
  key: TokenKey.AccessTokenPrivateKey | TokenKey.RefreshTokenPrivateKey,
  options: SignOptions = {}
) => {
  const privateKey = getTokenKeyFromConfig(key);

  return jwt.sign(payload, privateKey, { ...options, algorithm: 'RS512' });
};

export const verifySign = (
  token: string,
  key: TokenKey.AccessTokenPublicKey | TokenKey.RefreshTokenPublicKey,
  options: VerifyOptions = {
    algorithms: ['RS512'],
  }
) => {
  try {
    const publicKey = getTokenKeyFromConfig(key);

    return jwt.verify(token, publicKey, options);
  } catch (error) {
    console.error(error);
    return null;
  }
};
