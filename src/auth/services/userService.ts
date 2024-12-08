import db from "../../config/firestore";
import bcrypt from "bcrypt";

/**
 * Comprueba si un usuario con el correo proporcionado ya existe en Firestore.
 * @param email - El correo electrónico del usuario.
 * @returns - `true` si el usuario existe, `false` si no existe.
 */
export const userExists = async (email: string): Promise<boolean> => {
  const userRef = db.collection("users").doc(email);
  const userSnapshot = await userRef.get();
  return userSnapshot.exists;
};

/**
 * Crea un nuevo usuario en Firestore con una contraseña cifrada.
 * @param email - El correo electrónico del usuario.
 * @param password - La contraseña del usuario (en texto plano).
 * @returns - Promesa que resuelve cuando el usuario ha sido creado.
 */
export const createUser = async (email: string, password: string): Promise<void> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userRef = db.collection("users").doc(email);
  await userRef.set({ email, password: hashedPassword });
};

/**
 * Comprueba si la contraseña proporcionada coincide con la almacenada en Firestore.
 * @param email - El correo electrónico del usuario.
 * @param password - La contraseña proporcionada (en texto plano).
 * @returns - `true` si la contraseña coincide, `false` si no.
 */
export const verifyPassword = async (email: string, password: string): Promise<boolean> => {
  const userRef = db.collection("users").doc(email);
  const userSnapshot = await userRef.get();
  if (!userSnapshot.exists) {
    throw new Error("User not found");
  }
  const userData = userSnapshot.data();
  return await bcrypt.compare(password, userData?.password);
};
