import { Token } from "../entities/token";

export interface TokenRepository {
  saveToken(email: string, refreshToken: string, expiresIn: number): Promise<void>;
  getTokenByEmail(email: string): Promise<Token | null>;
  deleteToken(email: string): Promise<void>;
}

