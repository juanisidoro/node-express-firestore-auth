// infrastructure/auth/repositories/firestore-user.repository.ts
import { UserRepository } from "../../../domain/auth/interfaces/user.repository";
import { User } from "../../../domain/auth/entities/user.entity";
import db from "../../config/firestore";

export class FirestoreUserRepository implements UserRepository {
  private userCollection = db.collection("users");

  async userExists(email: string): Promise<boolean> {
    const userRef = this.userCollection.doc(email);
    const snapshot = await userRef.get();
    return snapshot.exists;
  }

  async createUser(user: User): Promise<void> {
    const { email, password, role } = user;
    await this.userCollection.doc(email).set({ email, password, role });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userRef = this.userCollection.doc(email);
    const snapshot = await userRef.get();
    if (!snapshot.exists) return null;
    const data = snapshot.data();
    if (!data) return null;
    return new User(data.email, data.password, data.role);
  }
}
