// application/auth/usecases/usecase-interfaces.ts
export interface PasswordHasher {
    hash(password: string): Promise<string>;
  }
  
  export interface PasswordComparer {
    compare(plain: string, hashed: string): Promise<boolean>;
  }
  
  export interface TokenService {
    generateAccessToken(email: string, role: string): string; // Actualización aquí
    generateRefreshToken(email: string): Promise<string>;
  }  
  
  export interface RefreshTokenVerifier {
    verifyRefreshToken(token: string): Promise<string>;
  }
  