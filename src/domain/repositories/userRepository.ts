// src/domain/repositories/userRepository.ts

import { User, Store, Role } from "../entities/user"; // Importar Role

export interface UserRepository {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  saveUser(userData: Partial<User>): Promise<string>;
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
  updateUser(id: string, updates: Partial<User>, requesterRole?: Role): Promise<void>;
  deleteUser(id: string): Promise<void>;
  hashPassword(password: string): Promise<string>;
  getAllUsers(): Promise<User[]>;
}
