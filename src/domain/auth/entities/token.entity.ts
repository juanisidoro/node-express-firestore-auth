// domain/auth/entities/token.entity.ts
import { Email } from "../value-objects/email.vo";

export class Token {
  private _email: Email;
  private _refreshToken: string;

  constructor(email: Email, refreshToken: string) {
    this._email = email;
    this._refreshToken = refreshToken;
  }

  get email(): Email {
    return this._email;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }
}
