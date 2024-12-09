import { TokenRepository } from "../../../domain/auth/interfaces/token.repository";
import { RefreshTokenDTO } from "../dtos/token.dto";
import { RefreshTokenVerifier } from "./usecase-interfaces";
import { Email } from "../../../domain/auth/value-objects/email.vo";

export class RefreshTokenUseCase {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly tokenService: { generateAccessToken(email: string): string },
    private readonly refreshTokenVerifier: RefreshTokenVerifier
  ) {}

  public async execute(data: RefreshTokenDTO): Promise<{ accessToken: string }> {
    const { refreshToken } = data;
    if (!refreshToken) {
      throw new Error("Missing refresh token");
    }

    const emailStr = await this.refreshTokenVerifier.verifyRefreshToken(refreshToken);
    const emailVO = new Email(emailStr);

    const storedToken = await this.tokenRepository.getTokenByEmail(emailVO.getValue());
    if (!storedToken || storedToken.refreshToken !== refreshToken) {
      throw new Error("Invalid token");
    }

    const accessToken = this.tokenService.generateAccessToken(emailVO.getValue());
    return { accessToken };
  }
}
