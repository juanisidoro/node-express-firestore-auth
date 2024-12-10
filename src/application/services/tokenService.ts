import jwt from "jsonwebtoken";

export class TokenService {
  private accessTokenSecret: string;
  private refreshTokenSecret: string;

  constructor() {
    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "default-access-token-secret";
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "default-refresh-token-secret";
  }

  generateAccessToken(email: string): string {
    return jwt.sign({ email }, this.accessTokenSecret, { expiresIn: "15m" });
  }

  async generateRefreshToken(email: string): Promise<string> {
    return jwt.sign({ email }, this.refreshTokenSecret, { expiresIn: "7d" });
  }

  async verifyRefreshToken(token: string): Promise<string> {
    const decoded = jwt.verify(token, this.refreshTokenSecret) as { email: string };
    if (!decoded || !decoded.email) {
      throw new Error("Invalid refresh token");
    }
    return decoded.email;
  }
}
