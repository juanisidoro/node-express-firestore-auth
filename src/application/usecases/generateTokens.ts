import { TokenService } from "../services/tokenService";
import { Role } from "../../domain/entities/user"; // Importa el tipo Role

export class GenerateTokens {
  constructor(private tokenService: TokenService) {}

  async execute(email: string, role: Role) {
    const accessToken = this.tokenService.generateAccessToken(email, role);
    const refreshToken = await this.tokenService.generateRefreshToken(email);
    return { accessToken, refreshToken };
  }
}

