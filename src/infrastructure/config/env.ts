// infrastructure/config/env.ts
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

function getEnvVar(name: string, required = true): string | undefined {
  const value = process.env[name];
  if (required && (!value || value.trim() === "")) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const ENV = {
  ACCESS_TOKEN_SECRET: getEnvVar("ACCESS_TOKEN_SECRET") as string,
  REFRESH_TOKEN_SECRET: getEnvVar("REFRESH_TOKEN_SECRET") as string,
  FIREBASE_CREDENTIALS: getEnvVar("FIREBASE_CREDENTIALS") as string,
  PORT: getEnvVar("PORT", false) || "3000"
};
