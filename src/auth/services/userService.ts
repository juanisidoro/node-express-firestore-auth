import db from "../../config/firestore";
import bcrypt from "bcrypt";
import { UserData } from "../../types/userTypes";

/**
 * Comprueba si un usuario con el correo proporcionado ya existe en Firestore.
 */
export const userExists = async (email: string): Promise<boolean> => {
  const userRef = db.collection("users").doc(email);
  const userSnapshot = await userRef.get();
  return userSnapshot.exists;
};

/**
 * Crea un nuevo usuario en Firestore con un rol predeterminado.
 */
export const createUser = async (email: string, password: string, role: string = "user"): Promise<void> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userRef = db.collection("users").doc(email);
  await userRef.set({ email, password: hashedPassword, role });
};

/**
 * Obtiene el rol de un usuario.
 */
export const getUserRole = async (email: string): Promise<string> => {
  const userRef = db.collection("users").doc(email);
  const userSnapshot = await userRef.get();
  const userData = userSnapshot.data() as UserData;
  return userData.role;
};
