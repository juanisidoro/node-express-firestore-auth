import { UserRepository } from "../../domain/repositories/userRepository";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string, role: string) {
    if (await this.userRepository.getUserByEmail(email)) {
      throw new Error("User already exists");
    }
    await this.userRepository.saveUser(email, password, role);
  }
}
