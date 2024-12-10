import { UserRepository } from "../../domain/repositories/userRepository";

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.getUserById(id); // Buscar por ID
    if (!user) {
      throw new Error("User not found");
    }
    await this.userRepository.deleteUser(id); // Eliminar por ID
  }
}
