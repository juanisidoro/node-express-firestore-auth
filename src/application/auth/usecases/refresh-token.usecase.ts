import { TokenRepository } from "../../../domain/auth/interfaces/token.repository";
import { RefreshTokenDTO } from "../dtos/token.dto";
import { RefreshTokenVerifier } from "./usecase-interfaces";
import { Email } from "../../../domain/auth/value-objects/email.vo";
import { UserRepository } from "../../../domain/auth/interfaces/user.repository";

export class RefreshTokenUseCase {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly tokenService: { generateAccessToken(email: string, role: string): string },
    private readonly refreshTokenVerifier: RefreshTokenVerifier,
    private readonly userRepository: UserRepository // Nuevo parámetro
  ) {}

  public async execute(data: RefreshTokenDTO): Promise<{ accessToken: string }> {
    const { refreshToken } = data;
    if (!refreshToken) {
      throw new Error("Missing refresh token");
    }

    // Verificar y obtener el email desde el refresh token
    const emailStr = await this.refreshTokenVerifier.verifyRefreshToken(refreshToken);
    const emailVO = new Email(emailStr);

    // Validar que el token almacenado coincida
    const storedToken = await this.tokenRepository.getTokenByEmail(emailVO.getValue());
    if (!storedToken || storedToken.refreshToken !== refreshToken) {
      throw new Error("Invalid token");
    }

    // Obtener el usuario para recuperar su rol
    const user = await this.userRepository.getUserByEmail(emailVO.getValue());
    if (!user) {
      throw new Error("User not found");
    }

    // Generar un nuevo accessToken incluyendo el rol del usuario
    const accessToken = this.tokenService.generateAccessToken(emailVO.getValue(), user.role.getValue());
    return { accessToken };
  }
}

