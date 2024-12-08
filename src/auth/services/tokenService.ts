import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../../config/firestore";
import { TokenData } from "../../types/tokenTypes";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "default-access-token-secret";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "default-refresh-token-secret";

export const generateAccessToken = (email: string): string => {
  return jwt.sign({ email }, accessTokenSecret, { expiresIn: "15m" });
};

export const generateRefreshToken = async (email: string): Promise<string> => {
  const refreshToken = jwt.sign({ email }, refreshTokenSecret, { expiresIn: "7d" });
  const tokenRef = db.collection("tokens").doc(email);
  await tokenRef.set({ email, refreshToken });
  return refreshToken;
};

export const verifyRefreshToken = async (token: string): Promise<string> => {
  const decoded = jwt.verify(token, refreshTokenSecret);
  if (typeof decoded === "object" && "email" in decoded) {
    const email = (decoded as JwtPayload).email as string;

    // Verificar en Firestore
    const tokenRef = db.collection("tokens").doc(email);
    const tokenSnapshot = await tokenRef.get();
    const tokenData = tokenSnapshot.data() as TokenData;

    if (tokenData && tokenData.refreshToken === token) {
      return email;
    }
  }

  throw new Error("Invalid token");
};

export const invalidateRefreshToken = async (email: string): Promise<void> => {
  const tokenRef = db.collection("tokens").doc(email);
  await tokenRef.delete();
};
