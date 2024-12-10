// src/application/usecases/updateUser.ts

import { UserRepository } from "../../domain/repositories/userRepository";
import { Role, Store } from "../../domain/entities/user"; // Importar Role

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(
    id: string,
    updates: Partial<{
      username?: string;
      first_name?: string;
      last_name?: string;
      email?: string;
      password?: string;
      role?: Role;
      url?: string;
      stores?: Store[];
    }>,
    requesterRole?: Role
  ): Promise<void> {
    if (updates.password) {
      updates.password = await this.userRepository.hashPassword(updates.password);
    }

    // Si el solicitante es admin, permitir actualizar el rol
    if (updates.role && requesterRole !== "admin") {
      throw new Error("Only admins can update roles");
    }

    await this.userRepository.updateUser(id, updates, requesterRole);
  }
}
