import express from "express";
import cors from "cors";

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(express.json()); // Procesar JSON
app.use(express.urlencoded({ extended: true })); // Procesar datos de formularios
app.use(cors()); // Habilitar CORS para manejar solicitudes entre dominios

// Ruta de prueba
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Exportar la app configurada
export default app;
