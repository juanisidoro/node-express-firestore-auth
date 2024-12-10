// src/application/usecases/getUser.ts

import { UserRepository } from "../../domain/repositories/userRepository";
import { User } from "../../domain/entities/user";

export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return await this.userRepository.getUserById(id);
  }
}
