import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/userRepository";
import db from "../db/firestore";
import bcrypt from "bcrypt";

export class FirestoreUserRepository implements UserRepository {
  async getUserByEmail(email: string): Promise<User | null> {
    const userDoc = await db.collection("users").doc(email).get();
    if (!userDoc.exists) return null;
    const data = userDoc.data();
    return new User(data!.email, data!.password, data!.role);
  }

  async saveUser(email: string, password: string, role: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection("users").doc(email).set({ email, password: hashedPassword, role });
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
