import admin from "firebase-admin";
import * as dotenv from "dotenv";
import path from "path"; // Importa el módulo path

dotenv.config(); // Cargar variables de entorno desde el archivo .env

// Ruta del archivo de credenciales desde el .env
const serviceAccountPath = process.env.FIREBASE_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error("La ruta de las credenciales de Firebase no está definida en el archivo .env");
}

// Resuelve la ruta absoluta desde la ruta relativa proporcionada
const absolutePath = path.resolve(serviceAccountPath);

// Inicializar Firebase Admin SDK usando la ruta absoluta
admin.initializeApp({
  credential: admin.credential.cert(require(absolutePath)),
});

// Exportar Firestore
const db = admin.firestore();
export default db;
