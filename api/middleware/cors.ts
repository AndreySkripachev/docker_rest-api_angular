import { MiddleWareFunction } from "../lib/app";

interface CorsConfig {

  readonly origin: string;

  readonly methods: string;

  readonly maxAge: number;
}

export function cors(config?: Partial<CorsConfig>): MiddleWareFunction {
  return (_request, response, next) => {
    response
      .setHeader('Access-Control-Allow-Origin', config?.origin ?? '*')
      .setHeader('Access-Control-Allow-Methods', config?.methods ?? 'OPTIONS, POST, GET, PUT, PATCH, DELETE')
      .setHeader('Access-Control-Max-Age', config?.maxAge ?? 2592000)
      .setHeader('Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, ' +
        'Origin, ' +
        'Accept, ' +
        'Content-Type, ' +
        'Authorization',
      );

    next();
  }
}
