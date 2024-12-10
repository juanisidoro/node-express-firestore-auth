import { Request, Response, NextFunction } from "express";
import { FirestoreUserRepository } from "../../../infraestructure/repositories/firestoreUserRepository";
import { TokenService } from "../../../application/services/tokenService";
import { AuthenticateUser } from "../../../application/usecases/authenticateUser";


const userRepository = new FirestoreUserRepository();
const tokenService = new TokenService();
const authenticateUser = new AuthenticateUser(userRepository, tokenService);

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await authenticateUser.execute(email, password);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
