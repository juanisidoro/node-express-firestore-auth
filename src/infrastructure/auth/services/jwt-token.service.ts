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
    let decoded: string | JwtPayload;

    try {
      // Intentar verificar el token
      decoded = jwt.verify(token, refreshTokenSecret);
    } catch (error) {
      // Si ocurre un error, lanzar una excepción genérica
      throw new Error("Invalid refresh token");
    }

    // Validar que el token decodificado tiene un campo "email"
    if (typeof decoded === "object" && "email" in decoded) {
      const email = (decoded as JwtPayload).email as string;

      // Verificar si el token coincide con el almacenado
      const storedToken = await this.tokenRepository.getTokenByEmail(email);
      if (storedToken && storedToken.refreshToken === token) {
        return email;
      }
    }

    // Si no pasa las verificaciones, lanzar una excepción genérica
    throw new Error("Invalid token");
  }
}
