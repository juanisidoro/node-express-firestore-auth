import db from "../../config/firestore";
import { UserManagementRepository } from "../../../domain/auth/interfaces/user-management.repository";
import { User } from "../../../domain/auth/entities/user.entity";
import { Email } from "../../../domain/auth/value-objects/email.vo";
import { Password } from "../../../domain/auth/value-objects/password.vo";
import { Role } from "../../../domain/auth/value-objects/role.vo";

export class FirestoreUserManagementRepository implements UserManagementRepository {
  private userCollection = db.collection("users");

  async getAllUsers(): Promise<User[]> {
    const snapshot = await this.userCollection.get();
    const users: User[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      const user = new User(
        new Email(data.email),
        new Password(data.password),
        new Role(data.role)
      );
      users.push(user);
    });
    return users;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userRef = this.userCollection.doc(email);
    const snapshot = await userRef.get();
    if (!snapshot.exists) return null;

    const data = snapshot.data();
    if (!data) return null;

    return new User(
      new Email(data.email),
      new Password(data.password),
      new Role(data.role)
    );
  }

  async updateUser(email: string, updatedData: Partial<{ password?: string; role?: string }>): Promise<void> {
    const userRef = this.userCollection.doc(email);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      // Si se considera necesario, podríamos lanzar un error indicando que no existe el usuario.
      return; 
    }
    await userRef.update(updatedData);
  }

  async deleteUser(email: string): Promise<void> {
    const userRef = this.userCollection.doc(email);
    await userRef.delete();
  }
}
