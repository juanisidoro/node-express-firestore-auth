import { UserRepository } from "../../domain/repositories/userRepository";
import { TokenService } from "../services/tokenService";

export class AuthenticateUser {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user || !(await this.userRepository.verifyPassword(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const accessToken = this.tokenService.generateAccessToken(email);
    const refreshToken = await this.tokenService.generateRefreshToken(email);
    return { accessToken, refreshToken };
  }
}
