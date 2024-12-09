import { Request, Response, NextFunction } from "express";
import { ListUsersUseCase } from "../../../application/auth/usecases/list-users.usecase";
import { GetUserUseCase } from "../../../application/auth/usecases/get-user.usecase";
import { UpdateUserUseCase } from "../../../application/auth/usecases/update-user.usecase";
import { DeleteUserUseCase } from "../../../application/auth/usecases/delete-user.usecase";
import { UpdateUserDTO, GetUserDTO, DeleteUserDTO } from "../../../application/auth/dtos/user-management.dto";

// Controlador para listar usuarios
export const listUsersController = (listUsersUseCase: ListUsersUseCase) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await listUsersUseCase.execute();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
};

// Controlador para obtener un usuario por email
export const getUserController = (getUserUseCase: GetUserUseCase) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.params;
      const user = await getUserUseCase.execute({ email } as GetUserDTO);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      next(error); // Pasar el error al middleware global
    }
  };
};

// Controlador para actualizar un usuario
export const updateUserController = (updateUserUseCase: UpdateUserUseCase) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;
      const { password, role } = req.body;
      await updateUserUseCase.execute({ email, password, role });
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  };
};

// Controlador para eliminar un usuario
export const deleteUserController = (deleteUserUseCase: DeleteUserUseCase) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;
      await deleteUserUseCase.execute({ email } as DeleteUserDTO);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
};
