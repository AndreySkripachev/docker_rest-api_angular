import { ServerResponseCode } from '../../enums/server-response';

export class AppError extends Error {

  public constructor(
    public readonly message: string,
    public readonly statusCode: ServerResponseCode,
  ) {
    super(message);
  }

  public getErrorJson() {
    return {
      message: this.message,
      code: this.statusCode,
    }
  }

  public static isAppError(err: unknown): err is AppError {
    return err instanceof AppError;
  }
}
