// infrastructure/auth/controllers/login.controller.ts
import { Request, Response, NextFunction } from "express";
import { LoginUserUseCase } from "../../../application/auth/usecases/login-user.usecase";
import { LoginUserDTO } from "../../../application/auth/dtos/user.dto";

export const loginController = (loginUserUseCase: LoginUserUseCase) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as LoginUserDTO;
      const tokens = await loginUserUseCase.execute({ email, password });
      res.status(200).json(tokens);
    } catch (error) {
      next(error); // Pasar el error al middleware global
    }
  };
};
