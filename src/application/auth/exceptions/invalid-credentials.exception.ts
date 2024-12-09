import { BaseApplicationError } from "./base-application-error";

export class InvalidCredentialsError extends BaseApplicationError {
  public statusCode = 401;
  
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
  }
}
