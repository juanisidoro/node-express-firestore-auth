export type UserData = {
  email: string;
  password: string;
  role: string; // Rol del usuario, como "admin" o "user".
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
