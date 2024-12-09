import { UserManagementRepository } from "../../../domain/auth/interfaces/user-management.repository";
import { UpdateUserDTO } from "../dtos/user-management.dto";
import { Password } from "../../../domain/auth/value-objects/password.vo";
import { Role } from "../../../domain/auth/value-objects/role.vo";
import { InvalidRoleError, RoleType } from "../../../domain/auth/value-objects/role.vo";
import { InvalidPasswordError } from "../../../domain/auth/value-objects/password.vo";

export class UpdateUserUseCase {
  constructor(
    private readonly userManagementRepository: UserManagementRepository,
    private readonly passwordHasher: { hash(password: string): Promise<string> }
  ) {}

  public async execute(data: UpdateUserDTO): Promise<void> {
    const { email, password, role } = data;

    const updates: Partial<{ password: string; role: string }> = {};

    if (password) {
      if (!Password.validate(password)) {
        throw new InvalidPasswordError();
      }
      const hashedPassword = await this.passwordHasher.hash(password);
      updates.password = hashedPassword;
    }

    if (role) {
      if (!["admin", "user"].includes(role)) {
        throw new InvalidRoleError(role);
      }
      updates.role = role as RoleType;
    }

    await this.userManagementRepository.updateUser(email, updates);
  }
}

