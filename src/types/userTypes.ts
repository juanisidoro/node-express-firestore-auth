export type UserData = {
  password: string;
};

/**
 * Verifica si el objeto recibido es de tipo `UserData`.
 * @param data - Objeto a validar.
 * @returns - `true` si el objeto es válido, de lo contrario `false`.
 */
export const isValidUserData = (data: any): data is UserData => {
  return (
    data !== undefined && // Asegura que no sea undefined
    typeof data === "object" &&
    typeof data.password === "string"
  );
};
