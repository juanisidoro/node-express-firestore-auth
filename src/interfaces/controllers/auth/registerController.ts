import { Request, Response, NextFunction } from "express";
import { FirestoreUserRepository } from "../../../infraestructure/repositories/firestoreUserRepository";
import { CreateUser } from "../../../application/usecases/createUser";

const userRepository = new FirestoreUserRepository();
const createUser = new CreateUser(userRepository);

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, role } = req.body;
    await createUser.execute(email, password, role);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
