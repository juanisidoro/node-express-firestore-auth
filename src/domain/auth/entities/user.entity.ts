// domain/auth/entities/user.entity.ts
export type Role = "admin" | "user";

export class User {
  private _email: string;
  private _password: string;
  private _role: Role;

  constructor(email: string, password: string, role: Role) {
    this._email = email;
    this._password = password;
    this._role = role;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get role(): Role {
    return this._role;
  }
}
