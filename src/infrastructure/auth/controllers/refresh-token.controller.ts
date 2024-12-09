// infrastructure/auth/controllers/refresh-token.controller.ts
import { Request, Response, NextFunction } from "express";
import { RefreshTokenUseCase } from "../../../application/auth/usecases/refresh-token.usecase";
import { RefreshTokenDTO } from "../../../application/auth/dtos/token.dto";

export const refreshTokenController = (refreshTokenUseCase: RefreshTokenUseCase) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body as RefreshTokenDTO;
      const { accessToken } = await refreshTokenUseCase.execute({ refreshToken });
      res.status(200).json({ accessToken });
    } catch (error) {
      next(error); // Pasar el error al middleware global
    }
  };
};
