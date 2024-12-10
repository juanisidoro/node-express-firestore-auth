import dotenv from "dotenv";

dotenv.config();

export const env = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "default-access-token-secret",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "default-refresh-token-secret",
  FIREBASE_CREDENTIALS: process.env.FIREBASE_CREDENTIALS || "",
  PORT: process.env.PORT || 3000,
};
