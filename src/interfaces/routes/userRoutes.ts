import express from "express";
import { getUserController } from "../controllers/user/getUserController";
import { updateUserController } from "../controllers/user/updateUserController";
import { deleteUserController } from "../controllers/user/deleteUserController";
import { registerController } from "../controllers/auth/registerController";
import { authMiddleware, adminOnlyMiddleware, selfOrAdminMiddleware } from "../../middleware/authMiddleware";
import { getAllUsersController } from "../controllers/user/getAllUsersController";


const router = express.Router();

//Obtener todos los usuariois
router.get("/", authMiddleware, getAllUsersController); // Ruta protegida por authMiddleware


// Crear usuario (accesible para admins)
router.post("/", authMiddleware, adminOnlyMiddleware, registerController);

// Obtener información del usuario
router.get("/:id", authMiddleware, selfOrAdminMiddleware, getUserController);

// Actualizar usuario
router.put("/:id", authMiddleware, selfOrAdminMiddleware, updateUserController);

// Eliminar usuario
router.delete("/:id", authMiddleware, selfOrAdminMiddleware, deleteUserController);

export default router;

