// application/auth/exceptions/invalid-credentials.exception.ts
export class InvalidCredentialsError extends Error {
    constructor() {
      super("Invalid credentials");
      this.name = "InvalidCredentialsError";
    }
  }
  