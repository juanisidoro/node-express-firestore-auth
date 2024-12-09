// infrastructure/auth/services/jwt-token.service.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenRepository } from "../../../domain/auth/interfaces/token.repository";
import { Token } from "../../../domain/auth/entities/token.entity";
import { ENV } from "../../config/env";
import { Email } from "../../../domain/auth/value-objects/email.vo";


export class JwtTokenService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  public generateAccessToken(email: string, role: string): string {
    return jwt.sign({ email, role }, ENV.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  }

  public async generateRefreshToken(email: string): Promise<string> {
    const refreshToken = jwt.sign({ email }, ENV.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    const token = new Token(new Email(email), refreshToken);
    await this.tokenRepository.saveToken(token);
    return refreshToken;
  }
}

export class JwtRefreshTokenVerifier {
  constructor(private readonly tokenRepository: TokenRepository) {}

  public async verifyRefreshToken(token: string): Promise<string> {
    let decoded: string | JwtPayload;
    try {
      decoded = jwt.verify(token, ENV.REFRESH_TOKEN_SECRET);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }

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
