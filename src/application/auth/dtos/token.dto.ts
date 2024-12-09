// application/auth/dtos/token.dto.ts
export type RefreshTokenDTO = {
    refreshToken: string;
  };
  
  export type AuthTokensDTO = {
    accessToken: string;
    refreshToken: string;
  };
  