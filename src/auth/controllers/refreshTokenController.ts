import { Request, Response, NextFunction } from "express";
import { verifyRefreshToken, generateAccessToken } from "../services/tokenService";

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ error: "Refresh token is required" });
  }

  try {
    const email = verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken(email);

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error during token refresh:", error);
    next(error); // Pasar el error al middleware global
  }
};
