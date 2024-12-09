export type GetUserDTO = {
    email: string;
  };
  
  export type UpdateUserDTO = {
    email: string;
    password?: string;
    role?: "admin" | "user";
  };
  
  export type DeleteUserDTO = {
    email: string;
  };
  
  // Para el listado de usuarios podemos utilizar UserResponseDTO ya existente (email, role)
  // o crear uno nuevo. Reutilizaremos `UserResponseDTO` del user.dto.ts ya existente.
  