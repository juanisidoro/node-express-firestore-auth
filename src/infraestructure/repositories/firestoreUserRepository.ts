// src/infraestructure/repositories/firestoreUserRepository.ts

import { User, Store, Role } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/userRepository";
import db from "../db/firestore";
import bcrypt from "bcrypt";

export class FirestoreUserRepository implements UserRepository {
  // Obtener un usuario por Firestore ID
  async getUserById(id: string): Promise<User | null> {
    try {
      const userDoc = await db.collection("users").doc(id).get();
      if (!userDoc.exists) {
        return null;
      }
      const data = userDoc.data();
      if (!data) return null;

      return new User(
        id,
        data.username,
        data.first_name,
        data.last_name,
        data.email,
        data.password,
        data.role,
        data.created_at,
        data.last_login,
        data.url,
        data.stores || []
      );
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Error fetching user by ID");
    }
  }


  // Guardar un nuevo usuario en Firestore
  async saveUser(userData: Partial<User>): Promise<string> {
    const {
      email,
      password, // Este ya debería venir hasheado
      role,
      username = "",
      first_name = "",
      last_name = "",
      url = "",
      stores = [],
    } = userData;
  
    if (!email || !password || !role) {
      throw new Error("Missing required fields to create user");
    }
  
    const createdAt = new Date().toISOString();
    const newUser: Partial<User> = {
      username,
      first_name,
      last_name,
      email,
      password, // Almacena la contraseña hasheada directamente
      role,
      created_at: createdAt,
      last_login: createdAt,
      url,
      stores,
    };
  
    const userRef = await db.collection("users").add(newUser);
    return userRef.id;
  }
  


  // Verificar la contraseña del usuario
  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Actualizar un usuario por Firestore ID
  async updateUser(
    id: string,
    updates: Partial<User>,
    requesterRole?: Role
  ): Promise<void> {
    const userRef = db.collection("users").doc(id);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const existingUser = userDoc.data();
    if (!existingUser) {
      throw new Error("User data is corrupted");
    }

    // Si se actualiza la contraseña, hashearla
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Si se intenta actualizar el rol, verificar permisos
    if (updates.role && requesterRole !== "admin") {
      throw new Error("No permission to update role");
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

    await userRef.delete();
  }

  // Obtener un usuario por correo electrónico
  async getUserByEmail(email: string): Promise<User | null> {
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();
    if (userSnapshot.empty) return null;
    const userDoc = userSnapshot.docs[0];
    const data = userDoc.data();
    if (!data) return null;
    return new User(
      userDoc.id,
      data.username,
      data.first_name,
      data.last_name,
      data.email,
      data.password,
      data.role,
      data.created_at,
      data.last_login,
      data.url,
      data.stores || []
    );
  }

  // Hashing de contraseña
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // Obtener todos los usuarios
  async getAllUsers(): Promise<User[]> {
    const usersSnapshot = await db.collection("users").get();
    if (usersSnapshot.empty) {
      return [];
    }

    return usersSnapshot.docs.map((doc) => {
      const data = doc.data();
      return new User(
        doc.id,
        data.username,
        data.first_name,
        data.last_name,
        data.email,
        data.password,
        data.role,
        data.created_at,
        data.last_login,
        data.url,
        data.stores || []
      );
    });
  }

  // Método para verificar si existe un admin
  async hasAdmin(): Promise<boolean> {
    const adminSnapshot = await db
      .collection("users")
      .where("role", "==", "admin")
      .limit(1)
      .get();
    return !adminSnapshot.empty;
  }
}
