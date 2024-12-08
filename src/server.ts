import app from "./app";

// Puerto del servidor (puede ser configurado con .env o por defecto 3000)
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
