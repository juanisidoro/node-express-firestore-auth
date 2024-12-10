import { TokenService } from "../services/tokenService";

export class GenerateTokens {
  constructor(private tokenService: TokenService) {}

  async execute(email: string) {
    const accessToken = this.tokenService.generateAccessToken(email);
    const refreshToken = await this.tokenService.generateRefreshToken(email);
    return { accessToken, refreshToken };
  }
}
