// domain/auth/interfaces/token.repository.ts
import { Token } from "../entities/token.entity";

export interface TokenRepository {
  saveToken(token: Token): Promise<void>;
  getTokenByEmail(email: string): Promise<Token | null>;
  deleteToken(email: string): Promise<void>;
}
