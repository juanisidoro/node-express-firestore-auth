import { User } from "../entities/user";

export interface UserRepository {
  getUserByEmail(email: string): Promise<User | null>;
  saveUser(email: string, password: string, role: string): Promise<void>;
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
}
