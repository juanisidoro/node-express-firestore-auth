// infrastructure/middleware/error-mapper.ts
import { Response } from "express";
import { UserAlreadyExistsError } from "../../application/auth/exceptions/user-already-exists.exception";
import { InvalidCredentialsError } from "../../application/auth/exceptions/invalid-credentials.exception";
import { BaseApplicationError } from "../../application/auth/exceptions/base-application-error";
import { InvalidEmailError } from "../../domain/auth/value-objects/email.vo";
import { InvalidPasswordError } from "../../domain/auth/value-objects/password.vo";
import { InvalidRoleError } from "../../domain/auth/value-objects/role.vo";

export const handleError = (error: any, res: Response): Response => {
  if (error instanceof BaseApplicationError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (
    error instanceof InvalidEmailError ||
    error instanceof InvalidPasswordError ||
    error instanceof InvalidRoleError
  ) {
    return res.status(400).json({ message: error.message });
  }

  if (error.message === "Missing required fields") {
    return res.status(400).json({ message: error.message });
  }

  if (error.message === "Invalid token" || error.message === "Invalid refresh token") {
    return res.status(403).json({ message: error.message });
  }

  // Manejar otros errores genéricos como 500
  return res.status(500).json({ message: "Internal server error" });
};
