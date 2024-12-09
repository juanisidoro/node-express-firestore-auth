import { BaseApplicationError } from "./base-application-error";

export class UserAlreadyExistsError extends BaseApplicationError {
  public statusCode = 409;
  
  constructor() {
    super("User already exists");
    this.name = "UserAlreadyExistsError";
  }
}
