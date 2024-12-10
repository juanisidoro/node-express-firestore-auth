import { Request, Response, NextFunction } from "express";
import { FirestoreUserRepository } from "../../../infraestructure/repositories/firestoreUserRepository";
import { FirestoreTokenRepository } from "../../../infraestructure/repositories/firestoreTokenRepository";
import { CreateUser } from "../../../application/usecases/createUser";
import { TokenService } from "../../../application/services/tokenService";

const userRepository = new FirestoreUserRepository();
const tokenRepository = new FirestoreTokenRepository();
const createUser = new CreateUser(userRepository);
const tokenService = new TokenService();

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, role } = req.body;

    // Crear usuario en Firestore
    await createUser.execute(email, password, role);

    // Generar tokens
    const accessToken = tokenService.generateAccessToken(email);
    const refreshToken = await tokenService.generateRefreshToken(email);

    // Guardar el refreshToken en Firestore
    await tokenRepository.saveToken(email, refreshToken, 7 * 24 * 60 * 60); // 7 días de expiración

    // Enviar respuesta
    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
