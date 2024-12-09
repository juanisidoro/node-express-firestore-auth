// application/auth/exceptions/base-application-error.ts
export abstract class BaseApplicationError extends Error {
    public abstract statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.name = "BaseApplicationError";
    }
  }
  