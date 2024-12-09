// application/auth/usecases/refresh-token.usecase.ts
import { TokenRepository } from "../../../domain/auth/interfaces/token.repository";
import { RefreshTokenDTO, AuthTokensDTO } from "../dtos/token.dto";

export interface RefreshTokenVerifier {
  verifyRefreshToken(token: string): Promise<string>;
}

export class RefreshTokenUseCase {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly tokenService: { generateAccessToken(email: string): string },
    private readonly refreshTokenVerifier: RefreshTokenVerifier
  ) {}

  public async execute(data: RefreshTokenDTO): Promise<{ accessToken: string }> {
    const { refreshToken } = data;
    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }

    const email = await this.refreshTokenVerifier.verifyRefreshToken(refreshToken);
    // Podríamos opcionalmente verificar que el token existe en el repositorio.
    const storedToken = await this.tokenRepository.getTokenByEmail(email);
    if (!storedToken || storedToken.refreshToken !== refreshToken) {
      throw new Error("Invalid token");
    }

    const accessToken = this.tokenService.generateAccessToken(email);
    return { accessToken };
  }
}
