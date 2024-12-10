import { UserRepository } from "../../domain/repositories/userRepository";
import { User } from "../../domain/entities/user";

export class GetAllUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getAllUsers(); // Obtener todos los usuarios del repositorio
  }
}
