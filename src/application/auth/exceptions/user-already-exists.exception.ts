// application/auth/exceptions/user-already-exists.exception.ts
export class UserAlreadyExistsError extends Error {
    constructor() {
      super("User already exists");
      this.name = "UserAlreadyExistsError";
    }
  }
  