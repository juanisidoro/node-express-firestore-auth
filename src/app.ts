import express from "express";
import cors from "cors";
import authRoutes from "./interfaces/routes/authRoutes";
import userRoutes from "./interfaces/routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rutas
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
