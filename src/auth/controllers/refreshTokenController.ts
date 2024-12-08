import { Request, Response, NextFunction } from "express";
import { verifyRefreshToken, generateAccessToken } from "../services/tokenService";

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).send();
    return;
  }

  try {
    const email = await verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken(email);

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(403).send();
  }
};
