// domain/auth/value-objects/password.vo.ts
export class InvalidPasswordError extends Error {
    constructor() {
      super("Invalid password: must be at least 6 characters long");
      this.name = "InvalidPasswordError";
    }
  }
  
  export class Password {
    private readonly value: string;
  
    constructor(password: string) {
      if (!Password.isValidPassword(password)) {
        throw new InvalidPasswordError();
      }
      this.value = password;
    }
  
    public getValue(): string {
      return this.value;
    }
  
    private static isValidPassword(password: string): boolean {
      return password.length >= 6;
    }
  }
  