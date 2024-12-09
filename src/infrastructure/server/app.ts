// infrastructure/server/app.ts
import express from "express";
import cors from "cors";
import { errorHandler } from "../middleware/error-handler";
import { createAuthRouter } from "../auth/routes/auth.routes";

// Repositorios
import { FirestoreUserRepository } from "../auth/repositories/firestore-user.repository";
import { FirestoreTokenRepository } from "../auth/repositories/firestore-token.repository";

// Servicios de infraestructura
import { BcryptPasswordHasher } from "../auth/services/password-hasher.service";
import { JwtTokenService, JwtRefreshTokenVerifier } from "../auth/services/jwt-token.service";

// Casos de Uso (Aplicación)
import { RegisterUserUseCase } from "../../application/auth/usecases/register-user.usecase";
import { LoginUserUseCase } from "../../application/auth/usecases/login-user.usecase";
import { RefreshTokenUseCase } from "../../application/auth/usecases/refresh-token.usecase";

// Controladores con dependencias inyectadas
import { registerController } from "../auth/controllers/register.controller";
import { loginController } from "../auth/controllers/login.controller";
import { refreshTokenController } from "../auth/controllers/refresh-token.controller";

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Instancias de repositorios
const userRepository = new FirestoreUserRepository();
const tokenRepository = new FirestoreTokenRepository();

// Instancias de servicios
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService(tokenRepository);
const refreshTokenVerifier = new JwtRefreshTokenVerifier(tokenRepository);

// Instancias de casos de uso
const registerUserUseCase = new RegisterUserUseCase(userRepository, tokenRepository, passwordHasher, tokenService);
const loginUserUseCase = new LoginUserUseCase(userRepository, tokenRepository, passwordHasher, tokenService);
const refreshTokenUseCase = new RefreshTokenUseCase(tokenRepository, tokenService, refreshTokenVerifier);

// Se crean los controladores inyectándoles los casos de uso
const registerCtrl = registerController(registerUserUseCase);
const loginCtrl = loginController(loginUserUseCase);
const refreshCtrl = refreshTokenController(refreshTokenUseCase);

// Crear el router de auth con los controladores configurados
const authRouter = createAuthRouter({
  register: registerCtrl,
  login: loginCtrl,
  refreshToken: refreshCtrl
});

// Rutas
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use("/auth", authRouter);

// Middleware de manejo de errores (al final)
app.use(errorHandler);

export default app;
