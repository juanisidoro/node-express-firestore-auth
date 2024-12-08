import express from "express";
import cors from "cors";
import authRoutes from "./auth/routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(express.json()); // Procesar JSON
app.use(express.urlencoded({ extended: true })); // Procesar datos de formularios
app.use(cors()); // Habilitar CORS para manejar solicitudes entre dominios

// Rutas
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});
app.use("/auth", authRoutes);

// Middleware de manejo de errores (colócalo al final)
app.use(errorHandler);

// Exportar la app configurada
export default app;
