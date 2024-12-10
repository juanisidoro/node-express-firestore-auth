import { TokenService } from "../services/tokenService";

export class RefreshToken {
  constructor(private tokenService: TokenService) {}

  async execute(refreshToken: string) {
    const email = await this.tokenService.verifyRefreshToken(refreshToken);
    return this.tokenService.generateAccessToken(email);
  }
}
