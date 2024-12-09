// domain/auth/interfaces/user.repository.ts
import { User } from "../entities/user.entity";

export interface UserRepository {
  userExists(email: string): Promise<boolean>;
  createUser(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | null>;
}
