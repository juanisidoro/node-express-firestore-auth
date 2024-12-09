// application/auth/dtos/user.dto.ts
export type RegisterUserDTO = {
    email: string;
    password: string;
    role: "admin" | "user";
  };
  
  export type LoginUserDTO = {
    email: string;
    password: string;
  };
  
  export type UserResponseDTO = {
    email: string;
    role: string;
  };
  