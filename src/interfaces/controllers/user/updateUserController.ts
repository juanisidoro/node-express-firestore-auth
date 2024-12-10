import { Request, Response, NextFunction } from "express";
import { FirestoreUserRepository } from "../../../infraestructure/repositories/firestoreUserRepository";
import { UpdateUser } from "../../../application/usecases/updateUser";

const userRepository = new FirestoreUserRepository();
const updateUser = new UpdateUser(userRepository);

export const updateUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params; // Asegúrate de usar `id` como parámetro
    const updates = req.body;

    // Validar que el ID no esté vacío o sea inválido
    if (!id || typeof id !== "string" || id.trim() === "") {
      res.status(400).json({ error: "Invalid or missing user ID" });
      return;
    }

    // Validar que se envíen datos para actualizar
    if (!updates || Object.keys(updates).length === 0) {
      res.status(400).json({ error: "No updates provided" });
      return;
    }

    // Llamar al caso de uso para realizar la actualización
    await updateUser.execute(id, updates);

    // Responder con éxito
    res.status(204).send();
  } catch (error) {
    console.error("Error in updateUserController:", error);
    next(error);
  }
};
