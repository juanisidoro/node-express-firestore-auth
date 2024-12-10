// src/interfaces/controllers/user/getAllUsersController.ts

import { Request, Response, NextFunction } from "express";
import { FirestoreUserRepository } from "../../../infraestructure/repositories/firestoreUserRepository";
import { GetAllUsers } from "../../../application/usecases/getAllUsers";

const userRepository = new FirestoreUserRepository();
const getAllUsers = new GetAllUsers(userRepository);

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Solo los usuarios con rol 'admin' pueden acceder
    if (req.user?.role !== "admin") {
      res.status(403).json({ error: "Access forbidden: Admins only" });
      return;
    }

    const users = await getAllUsers.execute();

    // Retorna toda la información de cada usuario
    res.status(200).json(
      users.map((user) => ({
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        last_login: user.last_login,
        url: user.url,
        stores: user.stores,
      }))
    );
  } catch (error: any) {
    console.error("Error in getAllUsersController:", error);
    next(error);
  }
};
