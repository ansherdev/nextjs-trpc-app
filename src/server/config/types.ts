export const enum TokenKey {
  "AccessTokenPrivateKey" = "accessTokenPrivateKey",
  "AccessTokenPublicKey" = "accessTokenPublicKey",
  "RefreshTokenPrivateKey" = "refreshTokenPrivateKey",
  "RefreshTokenPublicKey" = "refreshTokenPublicKey",
}

export interface ServerConfig {
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  [TokenKey.AccessTokenPrivateKey]: string;
  [TokenKey.AccessTokenPublicKey]: string;
  [TokenKey.RefreshTokenPrivateKey]: string;
  [TokenKey.RefreshTokenPublicKey]: string;
}
