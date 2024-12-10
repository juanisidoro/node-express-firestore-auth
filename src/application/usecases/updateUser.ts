import { UserRepository } from "../../domain/repositories/userRepository";

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, updates: Partial<{ password: string; role: string }>): Promise<void> {
    if (updates.password) {
      updates.password = await this.userRepository.hashPassword(updates.password);
    }

    await this.userRepository.updateUser(id, updates);
  }
}
