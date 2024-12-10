import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../infraestructure/env/dotenvConfig";
import { generateUserId } from "../infraestructure/helpers/idHelper"; // Helper para el ID

declare global {
  namespace Express {
    interface Request {
      user?: { email: string; role: string };
    }
  }
}

// Middleware para verificar el token
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Authentication token missing");

    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as { email: string; role: string };
    req.user = decoded; // Agregar información del usuario al request
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Middleware para permitir solo admins
export const adminOnlyMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { role } = req.user || {};
  if (role !== "admin") {
    res.status(403).json({ error: "Access forbidden: Admins only" });
    return;
  }
  next();
};


// Middleware para permitir acceso propio o admins
export const selfOrAdminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { email, role } = req.user || {};
  const { id } = req.params;

  if (!email) {
    res.status(401).json({ error: "Unauthorized: Missing email in token" });
    return;
  }

  const isSelf = generateUserId(email) === id;
  if (!isSelf && role !== "admin") {
    res.status(403).json({ error: "Access forbidden: Self or Admins only" });
    return;
  }
  next();
};
  
