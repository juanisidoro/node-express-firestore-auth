import { Request, Response, NextFunction } from "express";
import { userExists, createUser } from "../services/userService";
import { generateAccessToken, generateRefreshToken } from "../services/tokenService";

export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    res.status(400).send();
    return;
  }

  try {
    if (await userExists(email)) {
      res.status(409).send(); // Error silencioso
      return;
    }

    await createUser(email, password, role);

    const accessToken = generateAccessToken(email);
    const refreshToken = await generateRefreshToken(email);

    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

