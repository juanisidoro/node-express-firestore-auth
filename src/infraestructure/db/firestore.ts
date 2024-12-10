import admin from "firebase-admin";
import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

// Detectar si las credenciales son un archivo o un JSON string
const firebaseCredentialsPathOrJSON = process.env.FIREBASE_CREDENTIALS;

if (!firebaseCredentialsPathOrJSON) {
  throw new Error(
    "Firebase credentials are not defined in the environment variables."
  );
}

let firebaseCredentials;

if (fs.existsSync(firebaseCredentialsPathOrJSON)) {
  // Si es un archivo, cargarlo
  const absolutePath = path.resolve(firebaseCredentialsPathOrJSON);
  firebaseCredentials = require(absolutePath);
  console.log("Using Firebase credentials from local file:", absolutePath);
} else {
  try {
    // Intentar parsear como JSON string
    firebaseCredentials = JSON.parse(firebaseCredentialsPathOrJSON);
    console.log("Using Firebase credentials from environment variable.");
  } catch (error) {
    throw new Error(
      "Invalid FIREBASE_CREDENTIALS format. It must be a valid file path or JSON string."
    );
  }
}

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
});

const db = admin.firestore();
export default db;
