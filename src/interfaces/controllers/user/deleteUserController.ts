import { Request, Response, NextFunction } from "express";
import { FirestoreUserRepository } from "../../../infraestructure/repositories/firestoreUserRepository";
import { DeleteUser } from "../../../application/usecases/deleteUser";

const userRepository = new FirestoreUserRepository();
const deleteUser = new DeleteUser(userRepository);

export const deleteUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar que el ID no esté vacío
    if (!id || typeof id !== "string" || id.trim() === "") {
      res.status(400).json({ error: "Invalid or missing user ID" });
      return;
    }

    // Ejecutar el caso de uso para eliminar el usuario
    await deleteUser.execute(id);

    res.status(204).send();
  } catch (error) {
    console.error("Error in deleteUserController:", error);
    next(error);
  }
};

