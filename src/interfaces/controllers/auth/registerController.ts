// src/interfaces/controllers/auth/registerController.ts

import { Request, Response, NextFunction } from "express";
import { FirestoreUserRepository } from "../../../infraestructure/repositories/firestoreUserRepository";
import { FirestoreTokenRepository } from "../../../infraestructure/repositories/firestoreTokenRepository";
import { CreateUser } from "../../../application/usecases/createUser";
import { TokenService } from "../../../application/services/tokenService";
import { Role } from "../../../domain/entities/user"; // Importar Role

const userRepository = new FirestoreUserRepository();
const tokenRepository = new FirestoreTokenRepository();
const createUser = new CreateUser(userRepository);
const tokenService = new TokenService();

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, role } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      res.status(400).json({ error: "Missing required fields: email, password" });
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    // Obtener el rol del solicitante si está autenticado
    let userRole: Role = "user"; // Por defecto 'user'
    if (req.user && req.user.role === "admin") {
      if (role && ["admin", "user"].includes(role)) {
        userRole = role;
      }
    }

    // Crear usuario en Firestore y obtener su Firestore ID
    const id = await createUser.execute({
      email,
      password,
      role: userRole,
      username: "", // Opcional: Puedes dejarlo vacío o manejarlo según tu lógica
      first_name: "", // Opcional
      last_name: "", // Opcional
      url: "",
      stores: [],
    });

    // Generar tokens
    const accessToken = tokenService.generateAccessToken(email, userRole);
    const refreshToken = await tokenService.generateRefreshToken(email);

    // Guardar el refreshToken en Firestore
    await tokenRepository.saveToken(
      email,
      refreshToken,
      7 * 24 * 60 * 60
    ); // 7 días de expiración

    // Enviar respuesta
    res.status(201).json({ id, accessToken, refreshToken });
  } catch (error: any) {
    console.error("Error in registerController:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
