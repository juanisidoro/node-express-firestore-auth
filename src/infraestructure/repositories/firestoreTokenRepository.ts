// src/infraestructure/repositories/firestoreTokenRepository.ts

import db from "../db/firestore";

export class FirestoreTokenRepository {
  // Guardar el refresh token en Firestore
  async saveToken(email: string, refreshToken: string, expiresIn: number): Promise<void> {
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
    await db.collection("tokens").doc(email).set({
      refreshToken,
      expiresAt,
    });
  }

  // Obtener el refresh token por email
  async getTokenByEmail(email: string): Promise<{ refreshToken: string; expiresAt: string } | null> {
    const tokenDoc = await db.collection("tokens").doc(email).get();
    if (!tokenDoc.exists) {
      return null;
    }
    return tokenDoc.data() as { refreshToken: string; expiresAt: string };
  }

  // Eliminar el refresh token por email
  async deleteToken(email: string): Promise<void> {
    await db.collection("tokens").doc(email).delete();
  }
}


