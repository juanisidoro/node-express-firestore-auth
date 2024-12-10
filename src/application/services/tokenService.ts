import jwt from "jsonwebtoken";
import { FirestoreTokenRepository } from "../../infraestructure/repositories/firestoreTokenRepository";


export class TokenService {
  private accessTokenSecret: string;
  private refreshTokenSecret: string;
  private tokenRepository: FirestoreTokenRepository;

  constructor() {
    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "default-access-token-secret";
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "default-refresh-token-secret";
    this.tokenRepository = new FirestoreTokenRepository();
  }

  generateAccessToken(email: string, role: string): string {
    return jwt.sign({ email, role }, this.accessTokenSecret, { expiresIn: "15m" }); // Incluye 'role'
  }
  

  async generateRefreshToken(email: string): Promise<string> {
    const refreshToken = jwt.sign({ email }, this.refreshTokenSecret, { expiresIn: "7d" }); // Refresh token expira en 7 días
    await this.tokenRepository.saveToken(email, refreshToken, 7 * 24 * 60 * 60); // Guardar con 7 días de expiración
    return refreshToken;
  }

  async verifyRefreshToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, this.refreshTokenSecret) as { email: string };
      if (!decoded || !decoded.email) throw new Error("Invalid refresh token");

      const storedToken = await this.tokenRepository.getTokenByEmail(decoded.email);
      if (!storedToken || storedToken.refreshToken !== token) {
        throw new Error("Refresh token mismatch");
      }

      const now = new Date();
      if (storedToken.expiresAt <= now) {
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
