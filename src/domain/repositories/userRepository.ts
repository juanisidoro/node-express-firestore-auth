import { User } from "../entities/user";

export interface UserRepository {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  saveUser(email: string, password: string, role: string): Promise<string>;
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
  updateUser(id: string, updates: Partial<{ password: string; role: string }>): Promise<void>;
  deleteUser(id: string): Promise<void>;
  hashPassword(password: string): Promise<string>;
  getAllUsers(): Promise<User[]>; // Nuevo método

}
