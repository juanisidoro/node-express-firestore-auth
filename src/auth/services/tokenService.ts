import jwt, { JwtPayload } from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "default-access-token-secret";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "default-refresh-token-secret";

export const generateAccessToken = (email: string): string => {
  return jwt.sign({ email }, accessTokenSecret, { expiresIn: "15m" });
};

export const generateRefreshToken = (email: string): string => {
  return jwt.sign({ email }, refreshTokenSecret, { expiresIn: "7d" });
};

export const verifyRefreshToken = (token: string): string => {
  const decoded = jwt.verify(token, refreshTokenSecret);

  // Validar si el token decodificado es JwtPayload
  if (typeof decoded === "object" && "email" in decoded) {
    return (decoded as JwtPayload).email as string;
  }

  throw new Error("Invalid token: email not found");
};
