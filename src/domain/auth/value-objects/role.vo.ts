// domain/auth/value-objects/role.vo.ts
const VALID_ROLES = ["admin", "user"] as const;
export type RoleType = typeof VALID_ROLES[number];

export class InvalidRoleError extends Error {
  constructor(role: string) {
    super(`Invalid role: ${role}`);
    this.name = "InvalidRoleError";
  }
}

export class Role {
  private readonly value: RoleType;

  constructor(role: string) {
    if (!VALID_ROLES.includes(role as RoleType)) {
      throw new InvalidRoleError(role);
    }
    this.value = role as RoleType;
  }

  public getValue(): RoleType {
    return this.value;
  }
}
