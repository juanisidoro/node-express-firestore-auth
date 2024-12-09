// infrastructure/server/server.ts
import app from "./app";
import { ENV } from "../config/env";

const PORT = ENV.PORT; // usar la variable centralizada

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
