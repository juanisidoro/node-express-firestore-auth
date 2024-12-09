// application/auth/usecases/register-user.usecase.ts
import { UserRepository } from "../../../domain/auth/interfaces/user.repository";
import { TokenRepository } from "../../../domain/auth/interfaces/token.repository";
import { RegisterUserDTO } from "../dtos/user.dto";
import { AuthTokensDTO } from "../dtos/token.dto";
import { User } from "../../../domain/auth/entities/user.entity";

export interface PasswordHasher {
  hash(password: string): Promise<string>;
}

export interface TokenService {
  generateAccessToken(email: string): string;
  generateRefreshToken(email: string): Promise<string>;
}

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
      throw new Error("Email, password, and role are required");
    }

    const validRoles = ["admin", "user"];
    if (!validRoles.includes(role)) {
      throw new Error("Invalid role");
    }

    const exists = await this.userRepository.userExists(email);
    if (exists) {
      // Podemos lanzar un error genérico. La infraestructura decidirá que hacer (409, etc).
      throw new Error("User already exists");
    }

    const hashedPassword = await this.passwordHasher.hash(password);
    const newUser = new User(email, hashedPassword, role as "admin" | "user");
    await this.userRepository.createUser(newUser);

    const accessToken = this.tokenService.generateAccessToken(email);
    const refreshToken = await this.tokenService.generateRefreshToken(email);

    return { accessToken, refreshToken };
  }
}
