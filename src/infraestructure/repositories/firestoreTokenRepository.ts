import { Token } from "../../domain/entities/token";
import { TokenRepository } from "../../domain/repositories/tokenRepository";
import db from "../db/firestore";

export class FirestoreTokenRepository implements TokenRepository {
  async saveToken(email: string, refreshToken: string, expiresIn: number): Promise<void> {
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn);

    await db.collection("tokens").doc(email).set({
      email,
      refreshToken,
      expiresAt: expirationDate.toISOString(),
    });
  }

  async getTokenByEmail(email: string): Promise<Token | null> {
    const tokenDoc = await db.collection("tokens").doc(email).get();
    if (!tokenDoc.exists) return null;
    const data = tokenDoc.data();
    return new Token(data!.email, data!.refreshToken, new Date(data!.expiresAt));
  }

  async deleteToken(email: string): Promise<void> {
    await db.collection("tokens").doc(email).delete();
  }
}


