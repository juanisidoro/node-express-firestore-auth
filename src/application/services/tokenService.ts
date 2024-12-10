// src/application/services/tokenService.ts

import jwt from "jsonwebtoken";
import { FirestoreTokenRepository } from "../../infraestructure/repositories/firestoreTokenRepository";
import { Role } from "../../domain/entities/user";

export class TokenService {
  private accessTokenSecret: string;
  private refreshTokenSecret: string;
  private tokenRepository: FirestoreTokenRepository;

  constructor() {
    this.accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || "default-access-token-secret";
    this.refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET || "default-refresh-token-secret";
    this.tokenRepository = new FirestoreTokenRepository();
  }

  generateAccessToken(email: string, role: Role): string {
    const payload: any = { email, role };
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: "15m" });
  }

  async generateRefreshToken(email: string): Promise<string> {
    const refreshToken = jwt.sign({ email }, this.refreshTokenSecret, {
      expiresIn: "7d",
    });
    await this.tokenRepository.saveToken(
      email,
      refreshToken,
      7 * 24 * 60 * 60
    ); // 7 días en segundos
    return refreshToken;
  }

  async verifyRefreshToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(
        token,
        this.refreshTokenSecret
      ) as {
        email: string;
      };
      if (!decoded || !decoded.email) throw new Error("Invalid refresh token");

      const storedToken = await this.tokenRepository.getTokenByEmail(
        decoded.email
      );
      if (!storedToken || storedToken.refreshToken !== token) {
        throw new Error("Refresh token mismatch");
      }

      const now = new Date();
      const expiresAt = new Date(storedToken.expiresAt);
      if (expiresAt <= now) {
        throw new Error("Refresh token expired");
      }

      return decoded.email;
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }

  async invalidateRefreshToken(email: string): Promise<void> {
    await this.tokenRepository.deleteToken(email);
  }
}
