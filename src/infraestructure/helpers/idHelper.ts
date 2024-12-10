import crypto from "crypto";

export function generateUserId(email: string): string {
  return crypto.createHash("sha256").update(email).digest("hex");
}
