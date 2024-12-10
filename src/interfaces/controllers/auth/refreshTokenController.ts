import { Request, Response, NextFunction } from "express";
import { TokenService } from "../../../application/services/tokenService";
import { RefreshToken } from "../../../application/usecases/refreshToken";
import { FirestoreUserRepository } from "../../../infraestructure/repositories/firestoreUserRepository";

// Crear instancias de servicios y repositorios
const tokenService = new TokenService();
const userRepository = new FirestoreUserRepository();
const refreshTokenUseCase = new RefreshToken(tokenService, userRepository);

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      res.status(400).json({ error: "Refresh token is required" });
      return;
    }

    const accessToken = await refreshTokenUseCase.execute(token);
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error); // Manejo del error
  }
};
