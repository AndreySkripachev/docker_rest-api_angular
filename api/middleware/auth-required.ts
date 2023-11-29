import { MiddleWareFunction } from '../lib/app';
import { AuthorizationError } from '../core/utils/error/authorization-error';

export function authRequired(urls: string[]): MiddleWareFunction {
  return async(req, res, next) => {
    const url = req.url as string;

    const isUrlForUnauthorized = urls.find(u => url === u) === undefined;

    if (isUrlForUnauthorized || req.method === 'OPTIONS') {
      next();
      return;
    }

    const authToken = req.headers.authorization;


    if (authToken === undefined) {
      throw new AuthorizationError('Access is available only to authorized users');
    }

    next();
  }
}
