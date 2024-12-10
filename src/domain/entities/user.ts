export type Role = "admin" | "user";

export class User {
  constructor(
    public email: string,
    public password: string,
    public role: Role
  ) {}

  static isValidUser(data: any): data is User {
    return (
      typeof data === "object" &&
      typeof data.email === "string" &&
      typeof data.password === "string" &&
      ["admin", "user"].includes(data.role)
    );
  }
}
