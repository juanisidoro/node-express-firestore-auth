import express from "express";
import {
  listUsersController,
  getUserController,
  updateUserController,
  deleteUserController
} from "../controllers/user.controller";

// Estas funciones (controladores) serán inyectadas desde app.ts,
// al igual que se hizo con las rutas de auth.

export function createUserRouter({
  listUsers,
  getUser,
  updateUser,
  deleteUser
}: {
  listUsers: ReturnType<typeof listUsersController>;
  getUser: ReturnType<typeof getUserController>;
  updateUser: ReturnType<typeof updateUserController>;
  deleteUser: ReturnType<typeof deleteUserController>;
}) {
  const router = express.Router();

  router.get("/", listUsers);
  router.get("/:email", getUser);
  router.put("/:email", updateUser);
  router.delete("/:email", deleteUser);

  return router;
}
