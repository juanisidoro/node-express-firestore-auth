// infrastructure/auth/routes/auth.routes.ts
import express from "express";
import { registerController } from "../controllers/register.controller";
import { loginController } from "../controllers/login.controller";
import { refreshTokenController } from "../controllers/refresh-token.controller";

// Esta ruta será "construida" en app.ts, donde se inyectarán las dependencias (usecases).
export function createAuthRouter({
  register,
  login,
  refreshToken
}: {
  register: ReturnType<typeof registerController>;
  login: ReturnType<typeof loginController>;
  refreshToken: ReturnType<typeof refreshTokenController>;
}) {
  const router = express.Router();

  router.post("/register", register);
  router.post("/login", login);
  router.post("/refresh-token", refreshToken);

  return router;
}
