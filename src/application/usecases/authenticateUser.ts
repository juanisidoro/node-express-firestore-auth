import { UserRepository } from "../../domain/repositories/userRepository";
import { TokenService } from "../services/tokenService";

export class AuthenticateUser {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await this.userRepository.verifyPassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = this.tokenService.generateAccessToken(
      email,
      user.role
    );
    const refreshToken = await this.tokenService.generateRefreshToken(email);

    return { accessToken, refreshToken, userId: user.id };
  }
}
