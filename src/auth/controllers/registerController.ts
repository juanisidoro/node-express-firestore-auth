import { Request, Response, NextFunction } from "express";
import { userExists, createUser } from "../services/userService";
import { generateAccessToken, generateRefreshToken } from "../services/tokenService";
import { Role } from "../../types/userTypes"; // Importar los roles válidos

export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, role } = req.body;

  const validRoles: Role[] = ["admin", "user"]; // Roles permitidos

  if (!email || !password || !role) {
    res.status(400).json({ error: "Email, password, and role are required" });
    return;
  }

  if (!validRoles.includes(role)) {
    res.status(400).json({ error: "Invalid role" });
    return;
  }

  try {
    if (await userExists(email)) {
      res.status(409).send(); // Error silencioso si el usuario ya existe
      return;
    }

    await createUser(email, password, role);

    const accessToken = generateAccessToken(email);
    const refreshToken = await generateRefreshToken(email);

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    next(error); // Pasar el error al middleware global
  }
};
