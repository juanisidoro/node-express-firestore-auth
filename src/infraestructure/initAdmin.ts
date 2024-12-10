// src/infraestructure/initAdmin.ts

import { FirestoreUserRepository } from "./repositories/firestoreUserRepository";
import { FirestoreTokenRepository } from "./repositories/firestoreTokenRepository";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const initAdmin = async () => {
  const userRepository = new FirestoreUserRepository();
  const tokenRepository = new FirestoreTokenRepository();

  const adminExists = await userRepository.hasAdmin();
  if (adminExists) {
    console.log("Admin user already exists.");
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error("Admin credentials are not set in environment variables.");
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const createdAt = new Date().toISOString();

    const adminUser = {
      email: adminEmail,
      password: hashedPassword,
      role: "admin" as const,
      username: "admin",
      first_name: "Default",
      last_name: "Admin",
      url: "",
      stores: [],
      created_at: createdAt,
      last_login: createdAt,
    };

    // Crear el usuario admin
    const adminId = await userRepository.saveUser(adminUser);

    // Crear un token asociado al admin
    const accessTokenSecret =
      process.env.ACCESS_TOKEN_SECRET || "default-access-token-secret";
    const refreshTokenSecret =
      process.env.REFRESH_TOKEN_SECRET || "default-refresh-token-secret";

    const accessToken = jwt.sign(
      { email: adminEmail, role: "admin" },
      accessTokenSecret,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { email: adminEmail },
      refreshTokenSecret,
      { expiresIn: "7d" }
    );

    await tokenRepository.saveToken(adminEmail, refreshToken, 7 * 24 * 60 * 60); // Guardar el refresh token

    console.log("Admin token created in Firestore.");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

export default initAdmin;
