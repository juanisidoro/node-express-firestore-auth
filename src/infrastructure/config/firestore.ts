// infrastructure/config/firestore.ts
import admin from "firebase-admin";
import { ENV } from "./env";
import path from "path";

let serviceAccount;

// Detectar si estamos en producción (Vercel)
if (process.env.NODE_ENV === "production") {
  // En producción, usar la variable de entorno FIREBASE_CREDENTIALS
  serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS || "{}");
} else {
  // En desarrollo, usar el archivo local especificado en ENV.FIREBASE_CREDENTIALS
  const serviceAccountPath = ENV.FIREBASE_CREDENTIALS; // Ruta desde el .env local
  const absolutePath = path.resolve(serviceAccountPath);
  serviceAccount = require(absolutePath);
}

// Inicializar Firebase con las credenciales seleccionadas
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
export default db;
