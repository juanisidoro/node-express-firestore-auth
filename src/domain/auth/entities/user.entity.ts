// domain/auth/entities/user.entity.ts
import { Role } from "../value-objects/role.vo";
import { Email } from "../value-objects/email.vo";
import { Password } from "../value-objects/password.vo";

export class User {
  private _email: Email;
  private _password: Password;
  private _role: Role;

  constructor(email: Email, password: Password, role: Role) {
    this._email = email;
    this._password = password;
    this._role = role;
  }

  get email(): Email {
    return this._email;
  }

  get password(): Password {
    return this._password;
  }

  get role(): Role {
    return this._role;
  }
}
