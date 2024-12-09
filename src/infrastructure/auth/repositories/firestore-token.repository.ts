// infrastructure/auth/repositories/firestore-token.repository.ts
import { TokenRepository } from "../../../domain/auth/interfaces/token.repository";
import { Token } from "../../../domain/auth/entities/token.entity";
import db from "../../config/firestore";

export class FirestoreTokenRepository implements TokenRepository {
  private tokenCollection = db.collection("tokens");

  async saveToken(token: Token): Promise<void> {
    await this.tokenCollection.doc(token.email).set({
      email: token.email,
      refreshToken: token.refreshToken
    });
  }

  async getTokenByEmail(email: string): Promise<Token | null> {
    const tokenRef = this.tokenCollection.doc(email);
    const snapshot = await tokenRef.get();
    if (!snapshot.exists) return null;
    const data = snapshot.data();
    if (!data) return null;
    return new Token(data.email, data.refreshToken);
  }

  async deleteToken(email: string): Promise<void> {
    await this.tokenCollection.doc(email).delete();
  }
}
