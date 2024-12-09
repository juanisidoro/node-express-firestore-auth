import { UserRepository } from "../../../domain/auth/interfaces/user.repository";
import { TokenRepository } from "../../../domain/auth/interfaces/token.repository";
import { RegisterUserDTO } from "../dtos/user.dto";
import { AuthTokensDTO } from "../dtos/token.dto";
import { User } from "../../../domain/auth/entities/user.entity";
import { UserAlreadyExistsError } from "../exceptions/user-already-exists.exception";
import { PasswordHasher, TokenService } from "./usecase-interfaces";
import { Email } from "../../../domain/auth/value-objects/email.vo";
import { Password } from "../../../domain/auth/value-objects/password.vo";
import { Role } from "../../../domain/auth/value-objects/role.vo";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService
  ) {}

  public async execute(data: RegisterUserDTO): Promise<AuthTokensDTO> {
    const { email, password, role } = data;

    if (!email || !password || !role) {
      throw new Error("Missing required fields");
    }

    const emailVO = new Email(email);
    const passwordVO = new Password(password);
    const roleVO = new Role(role);

    const exists = await this.userRepository.userExists(emailVO.getValue());
    if (exists) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.passwordHasher.hash(passwordVO.getValue());
    const hashedPasswordVO = new Password(hashedPassword);

    const newUser = new User(emailVO, hashedPasswordVO, roleVO);
    await this.userRepository.createUser(newUser);

    const accessToken = this.tokenService.generateAccessToken(emailVO.getValue(), roleVO.getValue());
    const refreshToken = await this.tokenService.generateRefreshToken(emailVO.getValue());

    return { accessToken, refreshToken };
  }
}
