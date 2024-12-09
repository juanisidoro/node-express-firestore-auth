import { User } from "../entities/user.entity";

export interface UserManagementRepository {
  getAllUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(email: string, updatedData: Partial<{ password?: string; role?: string }>): Promise<void>;
  deleteUser(email: string): Promise<void>;
}
