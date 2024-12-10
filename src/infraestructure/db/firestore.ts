import admin from "firebase-admin";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

// Ruta del archivo de credenciales desde el archivo .env
const serviceAccountPath = process.env.FIREBASE_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error("La ruta de las credenciales de Firebase no está definida en el archivo .env");
}

// Resuelve la ruta absoluta desde la ruta relativa proporcionada
const absolutePath = path.resolve(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(require(absolutePath)),
});

const db = admin.firestore();
export default db;
