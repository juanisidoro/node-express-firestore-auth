import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import db from "../../config/firestore";
import { generateAccessToken, generateRefreshToken } from "../services/tokenService";
import { UserData, isValidUserData } from "../../types/userTypes";

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  try {
    const userRef = db.collection("users").doc(email);
    const userSnapshot = await userRef.get();

    // Validar existencia del usuario y datos válidos
    const userData = userSnapshot.data();
    if (!userSnapshot.exists || !userData || !isValidUserData(userData)) {
      res.status(404).json({ error: "User not found or data missing" });
      return;
    }

    // Type assertion para garantizar que userData es de tipo UserData
    const validUserData: UserData = userData as UserData;

    // Verificar la contraseña
    const isValidPassword = await bcrypt.compare(password, validUserData.password);
    if (!isValidPassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Generar tokens
    const accessToken = generateAccessToken(email);
    const refreshToken = generateRefreshToken(email);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Error during login:", error);
    next(error); // Pasar el error al middleware global
  }
};

