import { Request, Response, NextFunction } from "express";
import { TokenService } from "../../../application/services/tokenService";
import { RefreshToken } from "../../../application/usecases/refreshToken";

const tokenService = new TokenService();
const refreshToken = new RefreshToken(tokenService);

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken: token } = req.body;
    const accessToken = await refreshToken.execute(token);
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
