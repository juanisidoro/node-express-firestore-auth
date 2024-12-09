// infrastructure/middleware/error-handler.ts
import { Request, Response, NextFunction } from "express";
import { handleError } from "./error-mapper";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message || err); // Log para debugging
  handleError(err, res); // Delegar al mapeador de errores
};
