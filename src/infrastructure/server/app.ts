// infrastructure/server/app.ts
import express from "express";
import cors from "cors";
import { errorHandler } from "../middleware/error-handler";
import { createAuthRouter } from "../auth/routes/auth.routes";

// Repositorios
import { FirestoreUserRepository } from "../auth/repositories/firestore-user.repository";
import { FirestoreTokenRepository } from "../auth/repositories/firestore-token.repository";
import { FirestoreUserManagementRepository } from "../auth/repositories/firestore-user-management.repository";

// Servicios de infraestructura
import { BcryptPasswordHasher } from "../auth/services/password-hasher.service";
import { JwtTokenService, JwtRefreshTokenVerifier } from "../auth/services/jwt-token.service";

// Casos de Uso (Aplicación)
import { RegisterUserUseCase } from "../../application/auth/usecases/register-user.usecase";
import { LoginUserUseCase } from "../../application/auth/usecases/login-user.usecase";
import { RefreshTokenUseCase } from "../../application/auth/usecases/refresh-token.usecase";

import { ListUsersUseCase } from "../../application/auth/usecases/list-users.usecase";
import { GetUserUseCase } from "../../application/auth/usecases/get-user.usecase";
import { UpdateUserUseCase } from "../../application/auth/usecases/update-user.usecase";
import { DeleteUserUseCase } from "../../application/auth/usecases/delete-user.usecase";

// Controladores con dependencias inyectadas
import { registerController } from "../auth/controllers/register.controller";
import { loginController } from "../auth/controllers/login.controller";
import { refreshTokenController } from "../auth/controllers/refresh-token.controller";

import { listUsersController } from "../auth/controllers/user.controller";
import { getUserController } from "../auth/controllers/user.controller";
import { updateUserController } from "../auth/controllers/user.controller";
import { deleteUserController } from "../auth/controllers/user.controller";

// Nueva ruta de usuarios:
import { createUserRouter } from "../auth/routes/user.routes";

// Middleware de autorización
import { authorizeMiddleware } from "../middleware/authorize.middleware";

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Instancias de repositorios
const userRepository = new FirestoreUserRepository();
const tokenRepository = new FirestoreTokenRepository();
const userManagementRepository = new FirestoreUserManagementRepository();

// Instancias de servicios
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService(tokenRepository);
const refreshTokenVerifier = new JwtRefreshTokenVerifier(tokenRepository);

// Instancias de casos de uso
const registerUserUseCase = new RegisterUserUseCase(userRepository, tokenRepository, passwordHasher, tokenService);
const loginUserUseCase = new LoginUserUseCase(userRepository, tokenRepository, passwordHasher, tokenService);
const refreshTokenUseCase = new RefreshTokenUseCase(
  tokenRepository,
  tokenService,
  refreshTokenVerifier,
  userRepository
);


const listUsersUseCase = new ListUsersUseCase(userManagementRepository);
const getUserUseCase = new GetUserUseCase(userManagementRepository);
const updateUserUseCase = new UpdateUserUseCase(userManagementRepository, passwordHasher);
const deleteUserUseCase = new DeleteUserUseCase(userManagementRepository);

// Se crean los controladores inyectándoles los casos de uso
const registerCtrl = registerController(registerUserUseCase);
const loginCtrl = loginController(loginUserUseCase);
const refreshCtrl = refreshTokenController(refreshTokenUseCase);

const listUsersCtrl = listUsersController(listUsersUseCase);
const getUserCtrl = getUserController(getUserUseCase);
const updateUserCtrl = updateUserController(updateUserUseCase);
const deleteUserCtrl = deleteUserController(deleteUserUseCase);

// Crear el router de auth con los controladores configurados
const authRouter = createAuthRouter({
  register: registerCtrl,
  login: loginCtrl,
  refreshToken: refreshCtrl,
});

// Crear el router de usuarios con autorización
const userRouter = createUserRouter({
  listUsers: listUsersCtrl,
  getUser: getUserCtrl,
  updateUser: updateUserCtrl,
  deleteUser: deleteUserCtrl,
});

// Rutas
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use("/auth", authRouter);
app.use("/users", authorizeMiddleware("admin"), userRouter);

// Middleware de manejo de errores (al final)
app.use(errorHandler);

export default app;
