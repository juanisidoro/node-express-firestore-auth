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
    const email = user.email.getValue(); // Obtener el string del VO Email
    const password = user.password.getValue(); // Obtener el string del VO Password
    const role = user.role.getValue(); // Obtener el string del VO Role

    await this.userCollection.doc(email).set({ email, password, role });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userRef = this.userCollection.doc(email);
    const snapshot = await userRef.get();
    if (!snapshot.exists) return null;

    const data = snapshot.data();
    if (!data) return null;

    return new User(
      new (require("../../../domain/auth/value-objects/email.vo").Email)(data.email),
      new (require("../../../domain/auth/value-objects/password.vo").Password)(data.password),
      new (require("../../../domain/auth/value-objects/role.vo").Role)(data.role)
    );
  }
}
