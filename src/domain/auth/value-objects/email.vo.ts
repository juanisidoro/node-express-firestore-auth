// domain/auth/value-objects/email.vo.ts
export class InvalidEmailError extends Error {
    constructor(email: string) {
      super(`Invalid email format: ${email}`);
      this.name = "InvalidEmailError";
    }
  }
  
  export class Email {
    private readonly value: string;
  
    constructor(email: string) {
      if (!Email.isValidEmail(email)) {
        throw new InvalidEmailError(email);
      }
      this.value = email.toLowerCase();
    }
  
    public getValue(): string {
      return this.value;
    }
  
    private static isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
  