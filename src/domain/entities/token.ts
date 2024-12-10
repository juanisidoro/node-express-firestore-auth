export class Token {
    constructor(
      public email: string,
      public refreshToken: string
    ) {}
  
    static isValidToken(data: any): data is Token {
      return (
        typeof data === "object" &&
        typeof data.email === "string" &&
        typeof data.refreshToken === "string"
      );
    }
  }
  