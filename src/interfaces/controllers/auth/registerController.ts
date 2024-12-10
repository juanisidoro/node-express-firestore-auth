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

    if (!email || !password || !role) {
      throw new Error("Missing required fields: email, password, role");
    }

    // Crear usuario en Firestore y obtener su Firestore ID
    const id = await createUser.execute(email, password, role);

    // Generar tokens
    const accessToken = tokenService.generateAccessToken(email,role);
    const refreshToken = await tokenService.generateRefreshToken(email);

    // Guardar el refreshToken en Firestore
    await tokenRepository.saveToken(email, refreshToken, 7 * 24 * 60 * 60); // 7 días de expiración

    // Enviar respuesta
    res.status(201).json({ id, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
