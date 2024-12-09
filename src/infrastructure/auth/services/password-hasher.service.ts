// infrastructure/auth/services/password-hasher.service.ts
import bcrypt from "bcrypt";

export class BcryptPasswordHasher {
  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
