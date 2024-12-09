// application/auth/usecases/login-user.usecase.ts
import { UserRepository } from "../../../domain/auth/interfaces/user.repository";
import { TokenRepository } from "../../../domain/auth/interfaces/token.repository";
import { LoginUserDTO } from "../dtos/user.dto";
import { AuthTokensDTO } from "../dtos/token.dto";

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
      throw new Error("Email and password are required");
    }

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await this.passwordComparer.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const accessToken = this.tokenService.generateAccessToken(email);
    const refreshToken = await this.tokenService.generateRefreshToken(email);
    return { accessToken, refreshToken };
  }
}
