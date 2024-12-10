import { UserRepository } from "../../domain/repositories/userRepository";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string, role: string): Promise<string> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Guardar usuario y devolver Firestore ID
    return await this.userRepository.saveUser(email, password, role);
  }
}
