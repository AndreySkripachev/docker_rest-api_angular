import { ServerResponseCode } from '../core/enums/server-response'
import { AppError } from '../core/utils/error/app-error'
import { ErrorHandler } from '../lib/app'

export const errorHandler: ErrorHandler = (err, req, res) => {

  console.log('[Error handled]', err.message);

  if (res.closed) {
    return;
  }

  if (AppError.isAppError(err)) {
    res
      .writeHead(err.statusCode)
      .write(JSON.stringify(err.getErrorJson()));
  } else {
    res
      .writeHead(ServerResponseCode.BadRequest)
      .write(JSON.stringify({ message: err.message }));
  }

  res.end();
}
