import { TokenKey } from 'server/config/types';
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { serverConfig } from 'server/config/default';

export const signJwt = (
  payload: Object,
  key: TokenKey.AccessTokenPrivateKey | TokenKey.RefreshTokenPrivateKey,
  options: SignOptions = {}
) => {
  return jwt.sign(payload, serverConfig[key], options);
};

export const verifySign = (
  token: string,
  key: TokenKey.AccessTokenPublicKey | TokenKey.RefreshTokenPublicKey,
  options: VerifyOptions = {
    algorithms: ['RS512'],
  }
) => {
  try {
    return jwt.verify(token, serverConfig[key], options);
  } catch (error) {
    console.error(error);
    return null;
  }
};
