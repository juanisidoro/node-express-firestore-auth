export type Role = "admin" | "user";

export type UserData = {
  email: string;
  password: string;
  role: Role;
};
