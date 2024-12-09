import { UserRepository } from "../../../domain/auth/interfaces/user.repository";
import { TokenRepository } from "../../../domain/auth/interfaces/token.repository";
import { LoginUserDTO } from "../dtos/user.dto";
import { AuthTokensDTO } from "../dtos/token.dto";
import { InvalidCredentialsError } from "../exceptions/invalid-credentials.exception";

export interface PasswordComparer {
  compare(plain: string, hashed: string): Promise<boolean>;
}

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly passwordComparer: PasswordComparer,
    private readonly tokenService: {
      generateAccessToken(email: string): string;
      generateRefreshToken(email: string): Promise<string>;
    }
  ) {}

  public async execute(data: LoginUserDTO): Promise<AuthTokensDTO> {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error("Missing required fields"); // Lanza un error genérico
    }    

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isValidPassword = await this.passwordComparer.compare(password, user.password);
    if (!isValidPassword) {
      throw new InvalidCredentialsError();
    }

    // Verificar si ya existe un refresh token para este usuario
    const existingToken = await this.tokenRepository.getTokenByEmail(email);

    if (existingToken) {
      const accessToken = this.tokenService.generateAccessToken(email);
      return {
        accessToken,
        refreshToken: existingToken.refreshToken, // Retornar el token existente
      };
    }

    // Si no existe un refresh token, generamos uno nuevo
    const refreshToken = await this.tokenService.generateRefreshToken(email);
    const accessToken = this.tokenService.generateAccessToken(email);

    return { accessToken, refreshToken };
  }
}
