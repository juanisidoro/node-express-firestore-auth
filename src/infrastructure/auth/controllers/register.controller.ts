// infrastructure/auth/controllers/register.controller.ts
import { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase } from "../../../application/auth/usecases/register-user.usecase";
import { RegisterUserDTO } from "../../../application/auth/dtos/user.dto";

export const registerController = (registerUserUseCase: RegisterUserUseCase) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, role } = req.body as RegisterUserDTO;
      const tokens = await registerUserUseCase.execute({ email, password, role });
      res.status(201).json(tokens);
    } catch (error) {
      next(error); // Pasar el error al middleware global
    }
  };
};
