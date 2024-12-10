// src/application/usecases/refreshToken.ts

import { TokenService } from "../services/tokenService";
import { UserRepository } from "../../domain/repositories/userRepository";

export class RefreshToken {
  constructor(
    private tokenService: TokenService,
    private userRepository: UserRepository // Asegúrate de inyectar el repositorio de usuarios
  ) {}

  async execute(refreshToken: string) {
    // Verificar el refresh token y obtener el email
    const email = await this.tokenService.verifyRefreshToken(refreshToken);

    // Obtener el usuario para recuperar su rol
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Generar un nuevo access token con email y rol
    return this.tokenService.generateAccessToken(email, user.role);
  }
}
