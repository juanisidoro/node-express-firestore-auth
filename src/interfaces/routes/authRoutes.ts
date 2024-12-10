import express from "express";
import { loginController } from "../controllers/auth/loginController";
import { registerController } from "../controllers/auth/registerController";
import { refreshTokenController } from "../controllers/auth/refreshTokenController";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/refresh-token", refreshTokenController);

export default router;
