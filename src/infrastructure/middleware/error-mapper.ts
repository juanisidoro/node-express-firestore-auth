// infrastructure/middleware/error-mapper.ts
import { Response } from "express";
import { UserAlreadyExistsError } from "../../application/auth/exceptions/user-already-exists.exception";
import { InvalidCredentialsError } from "../../application/auth/exceptions/invalid-credentials.exception";

export const handleError = (error: any, res: Response): void => {
  if (error instanceof UserAlreadyExistsError) {
    res.status(409).send(); // Usuario ya existente
    return;
  }

  if (error instanceof InvalidCredentialsError) {
    res.status(401).send(); // Credenciales inválidas
    return;
  }

  if (error.message === "Invalid refresh token") {
    res.status(403).send(); // Token inválido
    return;
  }

  if (error.message === "Missing required fields") {
    res.status(400).send(); // Solicitud mal formada
    return;
  }
  
  if (error.message === "Missing refresh token") {
    res.status(400).send(); // Solicitud mal formada
    return;
  }
  
  // Manejar otros errores genéricos como 500
  res.status(500).send(); // Error interno del servidor
};
