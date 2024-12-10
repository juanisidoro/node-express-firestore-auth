import { Request, Response, NextFunction } from "express";
import { FirestoreUserRepository } from "../../../infraestructure/repositories/firestoreUserRepository";
import { GetAllUsers } from "../../../application/usecases/getAllUsers";

const userRepository = new FirestoreUserRepository();
const getAllUsers = new GetAllUsers(userRepository);

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Solo los usuarios con rol 'admin' pueden acceder
    if (req.user?.role !== "admin") {
      res.status(403).json({ error: "Access forbidden: Admins only" });
      return;
    }

    const users = await getAllUsers.execute();

    // Retorna solo los datos necesarios de los usuarios
    res.status(200).json(
      users.map(user => ({
        email: user.email,
        role: user.role,
      }))
    );
  } catch (error) {
    console.error("Error in getAllUsersController:", error);
    next(error);
  }
};
