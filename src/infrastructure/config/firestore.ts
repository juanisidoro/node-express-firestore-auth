// infrastructure/config/firestore.ts
import admin from "firebase-admin";
import { ENV } from "./env";
import path from "path";

const serviceAccountPath = ENV.FIREBASE_CREDENTIALS; // Ahora usamos ENV

const absolutePath = path.resolve(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(require(absolutePath)),
});

const db = admin.firestore();
export default db;
