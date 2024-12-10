export class Token {
  constructor(
    public email: string,
    public refreshToken: string,
    public expiresAt: Date // Añadir el campo de expiración
  ) {}

  static isValidToken(data: any): data is Token {
    return (
      typeof data === "object" &&
      typeof data.email === "string" &&
      typeof data.refreshToken === "string" &&
      typeof data.expiresAt === "string" // Esperamos un string ISO para la fecha
    );
  }
}

  