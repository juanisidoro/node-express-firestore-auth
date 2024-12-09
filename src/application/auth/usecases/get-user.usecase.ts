import { UserManagementRepository } from "../../../domain/auth/interfaces/user-management.repository";
import { GetUserDTO } from "../dtos/user-management.dto";
import { UserResponseDTO } from "../dtos/user.dto";

export class GetUserUseCase {
  constructor(private readonly userManagementRepository: UserManagementRepository) {}

  public async execute(data: GetUserDTO): Promise<UserResponseDTO | null> {
    const { email } = data;
    const user = await this.userManagementRepository.getUserByEmail(email);
    if (!user) return null;

    return {
      email: user.email.getValue(),
      role: user.role.getValue()
    };
  }
}
