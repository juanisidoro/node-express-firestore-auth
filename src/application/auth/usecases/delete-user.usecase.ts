import { UserManagementRepository } from "../../../domain/auth/interfaces/user-management.repository";
import { DeleteUserDTO } from "../dtos/user-management.dto";

export class DeleteUserUseCase {
  constructor(private readonly userManagementRepository: UserManagementRepository) {}

  public async execute(data: DeleteUserDTO): Promise<void> {
    const { email } = data;
    await this.userManagementRepository.deleteUser(email);
  }
}
