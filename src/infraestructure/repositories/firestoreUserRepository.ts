import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/userRepository";
import db from "../db/firestore";
import bcrypt from "bcrypt";

export class FirestoreUserRepository implements UserRepository {
  // Obtener un usuario por Firestore ID
  async getUserById(id: string): Promise<User | null> {
    try {
      const userDoc = await db.collection("users").doc(id).get();
      if (!userDoc.exists) {
        return null; // Si el documento no existe, devuelve null
      }
      const data = userDoc.data();
      return new User(data!.email, data!.password, data!.role);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Error fetching user by ID");
    }
  }
  
  

  // Guardar un nuevo usuario en Firestore
  async saveUser(email: string, password: string, role: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRef = await db.collection("users").add({
      email,
      password: hashedPassword,
      role,
    });
    return userRef.id; // Retorna el Firestore ID generado automáticamente
  }

  // Verificar la contraseña del usuario
  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Actualizar un usuario por Firestore ID
  async updateUser(id: string, updates: Partial<{ password: string; role: string }>): Promise<void> {
    const userRef = db.collection("users").doc(id);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    await userRef.update(updates);
  }

  // Eliminar un usuario por Firestore ID
  async deleteUser(id: string): Promise<void> {
    if (!id || typeof id !== "string" || id.trim() === "") {
      throw new Error("Invalid or missing user ID");
    }
  
    const userRef = db.collection("users").doc(id);
    const userDoc = await userRef.get();
  
    if (!userDoc.exists) {
      throw new Error("User not found");
    }
  
    await userRef.delete(); // Eliminar el documento
  }
  

  // Obtener un usuario por correo electrónico (opcional, si necesitas buscar por email)
  async getUserByEmail(email: string): Promise<User | null> {
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();
    if (userSnapshot.empty) return null;
    const userDoc = userSnapshot.docs[0];
    const data = userDoc.data();
    return new User(data.email, data.password, data.role);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async getAllUsers(): Promise<User[]> {
    const usersSnapshot = await db.collection("users").get();
    if (usersSnapshot.empty) {
      return []; // Retorna un array vacío si no hay usuarios
    }
  
    return usersSnapshot.docs.map(doc => {
      const data = doc.data();
      return new User(data.email, data.password, data.role); // Retornar como instancias de User
    });
  }
  

}
