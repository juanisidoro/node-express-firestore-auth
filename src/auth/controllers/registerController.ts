import { Request, Response, NextFunction } from "express";
import { userExists, createUser } from "../services/userService";
import { generateAccessToken, generateRefreshToken } from "../services/tokenService";

export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
  }

  try {
    if (await userExists(email)) {
      res.status(400).json({ error: "User already exists" });
    }

    await createUser(email, password);

    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Error during registration:", error);
    next(error); // Pasar el error al middleware global
  }
};
