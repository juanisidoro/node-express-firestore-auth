// src/application/usecases/createUser.ts

import { UserRepository } from "../../domain/repositories/userRepository";
import { User, Role } from "../../domain/entities/user"; // Importar Role

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userData: Partial<User>): Promise<string> {
    const { email, password, role } = userData;

    if (!email || !password) {
      throw new Error("Email and password are required to create a user");
    }

    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Asignar valores por defecto si es necesario
    const userRole: Role = role || "user";

    // Guardar usuario y devolver Firestore ID
    return await this.userRepository.saveUser({
      email,
      password,
      role: userRole,
      username: userData.username || "",
      first_name: userData.first_name || "",
      last_name: userData.last_name || "",
      url: userData.url || "",
      stores: userData.stores || [],
    });
  }
}
