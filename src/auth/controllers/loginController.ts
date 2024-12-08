import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import db from "../../config/firestore";
import { generateAccessToken, generateRefreshToken } from "../services/tokenService";
import { UserData, isValidUserData } from "../../types/userTypes";

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send();
    return;
  }

  try {
    const userRef = db.collection("users").doc(email);
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();

    if (!userSnapshot.exists || !userData || !isValidUserData(userData)) {
      res.status(401).send();
      return;
    }

    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
      res.status(401).send();
      return;
    }

    const accessToken = generateAccessToken(email);
    const refreshToken = await generateRefreshToken(email);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
