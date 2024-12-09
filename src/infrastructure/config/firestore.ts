// infrastructure/config/firestore.ts
import admin from "firebase-admin";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error("La ruta de las credenciales de Firebase no está definida en el archivo .env");
}

const absolutePath = path.resolve(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(require(absolutePath)),
});

const db = admin.firestore();
export default db;
