import { UserRepository } from "../../../domain/auth/interfaces/user.repository";
import { TokenRepository } from "../../../domain/auth/interfaces/token.repository";
import { LoginUserDTO } from "../dtos/user.dto";
import { AuthTokensDTO } from "../dtos/token.dto";
import { InvalidCredentialsError } from "../exceptions/invalid-credentials.exception";
import { PasswordComparer } from "./usecase-interfaces";
import { Email } from "../../../domain/auth/value-objects/email.vo";

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
      throw new Error("Missing required fields");
    }

    const emailVO = new Email(email);

    const user = await this.userRepository.getUserByEmail(emailVO.getValue());
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isValidPassword = await this.passwordComparer.compare(password, user.password.getValue());
    if (!isValidPassword) {
      throw new InvalidCredentialsError();
    }

    const existingToken = await this.tokenRepository.getTokenByEmail(emailVO.getValue());

    if (existingToken) {
      const accessToken = this.tokenService.generateAccessToken(emailVO.getValue());
      return {
        accessToken,
        refreshToken: existingToken.refreshToken,
      };
    }

    const refreshToken = await this.tokenService.generateRefreshToken(emailVO.getValue());
    const accessToken = this.tokenService.generateAccessToken(emailVO.getValue());
    return { accessToken, refreshToken };
  }
}
