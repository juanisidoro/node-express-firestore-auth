import { UserManagementRepository } from "../../../domain/auth/interfaces/user-management.repository";
import { UserResponseDTO } from "../dtos/user.dto";

export class ListUsersUseCase {
  constructor(private readonly userManagementRepository: UserManagementRepository) {}

  public async execute(): Promise<UserResponseDTO[]> {
    const users = await this.userManagementRepository.getAllUsers();
    return users.map(user => ({
      email: user.email.getValue(),
      role: user.role.getValue()
    }));
  }
}
