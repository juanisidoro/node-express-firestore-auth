import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export const authorizeMiddleware = (requiredRole: "admin" | "user" = "admin") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Missing authorization header" });
      return; // Importante: asegúrate de terminar la ejecución aquí.
    }

    const token = authHeader.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET) as { email: string; role?: string };

      // Verificar si el rol está incluido en el token
      if (!decoded.role) {
        res.status(403).json({ message: "No role information in token" });
        return; // Terminar ejecución
      }

      // Verificar que el rol cumpla con los requisitos
      if (requiredRole === "admin" && decoded.role !== "admin") {
        res.status(403).json({ message: "Forbidden: admin role required" });
        return; // Terminar ejecución
      }

      // Si todo está bien, añadir el usuario al request y llamar a next()
      (req as any).user = { email: decoded.email, role: decoded.role };
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
      return; // Terminar ejecución
    }
  };
};
