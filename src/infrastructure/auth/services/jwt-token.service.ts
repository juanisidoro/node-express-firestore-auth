// infrastructure/auth/services/jwt-token.service.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenRepository } from "../../../domain/auth/interfaces/token.repository";
import { Token } from "../../../domain/auth/entities/token.entity";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "default-access-token-secret";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "default-refresh-token-secret";

export class JwtTokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  public generateAccessToken(email: string): string {
    return jwt.sign({ email }, accessTokenSecret, { expiresIn: "15m" });
  }

  public async generateRefreshToken(email: string): Promise<string> {
    const refreshToken = jwt.sign({ email }, refreshTokenSecret, { expiresIn: "7d" });
    const token = new Token(email, refreshToken); // Crear una instancia de Token
    await this.tokenRepository.saveToken(token); // Pasar la instancia de Token
    return refreshToken;
  }
}

export class JwtRefreshTokenVerifier {
  constructor(private readonly tokenRepository: TokenRepository) {}

  public async verifyRefreshToken(token: string): Promise<string> {
    const decoded = jwt.verify(token, refreshTokenSecret);
    if (typeof decoded === "object" && "email" in decoded) {
      const email = (decoded as JwtPayload).email as string;
      const storedToken = await this.tokenRepository.getTokenByEmail(email);
      if (storedToken && storedToken.refreshToken === token) {
        return email;
      }
    }

    throw new Error("Invalid token");
  }
}
