import { Request, Response, NextFunction } from "express";
import { FirestoreUserRepository } from "../../../infraestructure/repositories/firestoreUserRepository";
import { GetUser } from "../../../application/usecases/getUser";

const userRepository = new FirestoreUserRepository();
const getUser = new GetUser(userRepository);

export const getUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar que el ID no esté vacío
    if (!id || typeof id !== "string" || id.trim() === "") {
      res.status(400).json({ error: "Invalid or missing user ID" });
      return;
    }

    // Obtener el usuario por ID
    const user = await getUser.execute(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in getUserController:", error);
    next(error);
  }
};
