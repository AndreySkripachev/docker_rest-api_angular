import { ServerResponseCode } from "../../enums/server-response";
import { AppError } from "./app-error";

export class ValidationError<TEntity extends object> extends AppError {

  public constructor(
    message: string,
    public readonly fields: Partial<Record<keyof TEntity, string>>,
  ) {
    super(message, ServerResponseCode.BadRequest);
  }

  public getErrorJson() {
    const generalInfo = super.getErrorJson();

    return {
      ...generalInfo,
      fields: this.fields
    }
  }
}
