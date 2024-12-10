// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Role } from "../domain/entities/user";

dotenv.config();

// Extensión de las declaraciones de Express para incluir `user`
declare global {
  namespace Express {
    interface Request {
      user?: { email: string; role: Role };
    }
  }
}

// Middleware para verificar el token
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "Authentication token missing" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Authentication token missing" });
      return;
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      email: string;
      role: Role;
    };
    req.user = { email: decoded.email, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Middleware para permitir solo admins
export const adminOnlyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { role } = req.user || {};
  if (role !== "admin") {
    res.status(403).json({ error: "Access forbidden: Admins only" });
    return;
  }
  next();
};

// Middleware para permitir acceso propio o admins
export const selfOrAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, role } = req.user || {};
  const { id: paramId } = req.params;

  if (!email) {
    res.status(401).json({ error: "Unauthorized: Missing user information" });
    return;
  }

  // Implementa la lógica para verificar si el usuario es el mismo o es admin
  // Por ejemplo, compara `email` con el email asociado al `paramId`
  // Esta parte depende de cómo manejas la relación entre `id` y `email`

  // Placeholder para la lógica
  const isSelf = true; // Reemplaza con la lógica real
  if (!isSelf && role !== "admin") {
    res.status(403).json({ error: "Access forbidden: Self or Admins only" });
    return;
  }
  next();
};
