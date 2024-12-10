// src/interfaces/controllers/auth/loginController.ts

import { Request, Response, NextFunction } from "express";
import { FirestoreUserRepository } from "../../../infraestructure/repositories/firestoreUserRepository";
import { TokenService } from "../../../application/services/tokenService";
import { AuthenticateUser } from "../../../application/usecases/authenticateUser";

const userRepository = new FirestoreUserRepository();
const tokenService = new TokenService();
const authenticateUser = new AuthenticateUser(userRepository, tokenService);

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Proceder con la autenticación normal
    const { accessToken, refreshToken, userId } = await authenticateUser.execute(email, password);

    res.status(200).json({ accessToken, refreshToken, userId });
  } catch (error: any) {
    console.error("Error in loginController:", error);
    res.status(500).json({ error: "Invalid credentials" });
  }
};
