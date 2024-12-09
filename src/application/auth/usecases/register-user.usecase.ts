import { UserRepository } from "../../../domain/auth/interfaces/user.repository";
import { TokenRepository } from "../../../domain/auth/interfaces/token.repository";
import { RegisterUserDTO } from "../dtos/user.dto";
import { AuthTokensDTO } from "../dtos/token.dto";
import { User } from "../../../domain/auth/entities/user.entity";
import { UserAlreadyExistsError } from "../exceptions/user-already-exists.exception";

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

    // Validar que todos los campos requeridos estén presentes
    if (!email || !password || !role) {
      throw new Error("Missing required fields");
    }

    // Validar que el rol sea válido
    const validRoles = ["admin", "user"];
    if (!validRoles.includes(role)) {
      throw new Error("Invalid role");
    }

    // Comprobar si el usuario ya existe
    const exists = await this.userRepository.userExists(email);
    if (exists) {
      throw new UserAlreadyExistsError();
    }

    // Hashear la contraseña y crear el usuario
    const hashedPassword = await this.passwordHasher.hash(password);
    const newUser = new User(email, hashedPassword, role as "admin" | "user");
    await this.userRepository.createUser(newUser);

    // Generar los tokens de autenticación
    const accessToken = this.tokenService.generateAccessToken(email);
    const refreshToken = await this.tokenService.generateRefreshToken(email);

    // Devolver los tokens
    return { accessToken, refreshToken };
  }
}
