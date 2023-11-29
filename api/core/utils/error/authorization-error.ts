import { ServerResponseCode } from "../../enums/server-response";
import { AppError } from "./app-error";

export class AuthorizationError extends AppError {

  public constructor(message: string) {
    super(message, ServerResponseCode.Unauthorized);
  }
}
