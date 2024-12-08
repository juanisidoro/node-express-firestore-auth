import express from "express";
import { registerController } from "../controllers/registerController";
import { loginController } from "../controllers/loginController";
import { refreshTokenController } from "../controllers/refreshTokenController";

const router = express.Router();

router.post("/register", (req, res, next) => registerController(req, res, next));
router.post("/login", (req, res, next) => loginController(req, res, next));
router.post("/refresh-token", (req, res, next) => refreshTokenController(req, res, next));

export default router;
