// domain/auth/entities/token.entity.ts
export class Token {
    private _email: string;
    private _refreshToken: string;
  
    constructor(email: string, refreshToken: string) {
      this._email = email;
      this._refreshToken = refreshToken;
    }
  
    get email(): string {
      return this._email;
    }
  
    get refreshToken(): string {
      return this._refreshToken;
    }
  }
  