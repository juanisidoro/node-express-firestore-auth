export type Role = "admin" | "user";

export type UserData = {
  email: string;
  password: string;
  role: Role;
};

export const isValidUserData = (data: any): data is UserData => {
  return (
    data !== undefined &&
    typeof data === "object" &&
    typeof data.email === "string" &&
    typeof data.password === "string" &&
    typeof data.role === "string"
  );
};
