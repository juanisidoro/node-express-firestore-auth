// infrastructure/server/server.ts
import app from "./app";
import { ENV } from "../config/env";

// Priorizar process.env.PORT en producción y usar ENV.PORT como respaldo
const PORT = process.env.PORT || ENV.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
