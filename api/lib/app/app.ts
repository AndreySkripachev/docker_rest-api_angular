import { IncomingMessage, ServerResponse, Server, createServer } from 'http';

import { Method, mapHttpMethodToMethod } from './utils/method';

type AppConstructor = {

  readonly port: number;

  readonly host: string;
}

type Listener = (request: IncomingMessage, response: ServerResponse) => void | Promise<void>;

export type ErrorHandler = (error: Error, request: IncomingMessage, response: ServerResponse) => void;

type Route = {

  readonly url: string | RegExp;

  readonly call: Listener;
}

export type MiddleWareFunction = (request: IncomingMessage, response: ServerResponse, next: () => void) => void | Promise<void>;

export class App {

  protected readonly port: number;

  protected readonly host: string;

  public readonly server: Server;

  protected readonly middlewares: MiddleWareFunction[] = [];

  protected errorHandler?: ErrorHandler;

  protected readonly routes: Readonly<Record<Method, Route[]>> = {
    [Method.Get]: [],
    [Method.Post]: [],
    [Method.Delete]: [],
    [Method.Patch]: [],
    [Method.Put]: [],
    [Method.Options]: [],
  };

  public constructor(config: AppConstructor) {
    this.host = config.host;
    this.port = config.port;

    this.server = createServer((req, res) => this.listen(req, res));

    this.server.listen(this.port, this.host);
  }

  private listen(request: IncomingMessage, response: ServerResponse): void {
    this.executeMiddleWare(request, response);
  }

  private async executeMiddleWare(request: IncomingMessage, response: ServerResponse, index = 0): Promise<void> {
    if (index < this.middlewares.length) {
      const next = () => this.executeMiddleWare(request, response, index + 1);

      try {
        await this.middlewares[index](request, response, next);
      } catch (err) {
        this.handleError(err, request, response);
      }

    } else {
      await this.callRoute(request, response);
    }
  }

  private async callRoute(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const method = mapHttpMethodToMethod(request.method ?? '');

    const requestUrl = new URL(request.url ?? '', `http://${request.headers.host}`);

    const route = this.routes[method].find(({ url }) => {
      if (typeof url === 'string') {
        return requestUrl.pathname.includes(url);
      }

      return url.test(requestUrl.pathname);
    });

    if (route === undefined) {
      return void response.end();
    }

    try {
      await route.call(request, response);
    } catch (err) {
      this.handleError(err, request, response);
    }
  }

  private defaultResponse(_request: IncomingMessage, response: ServerResponse): void {
    response.end();
  }

  private handleError(err: Error, req: IncomingMessage, res: ServerResponse): void {
    if (this.errorHandler !== undefined) {
      this.errorHandler(err, req, res);
    } else {
      throw err;
    }
  }

  public use(action: MiddleWareFunction): void {
    this.middlewares.push(action);
  }

  public get(url: string | RegExp, callback: Listener): void {
    this.routes[Method.Get].unshift({
      call: callback,
      url,
    });
    this.routes[Method.Options].unshift({
      call: this.defaultResponse,
      url
    });
  }

  public post(url: string | RegExp, callback: Listener): void {
    this.routes[Method.Post].unshift({
      call: callback,
      url,
    });
    this.routes[Method.Options].unshift({
      call: this.defaultResponse,
      url
    });
  }

  public put(url: string | RegExp, callback: Listener): void {
    this.routes[Method.Put].unshift({
      call: callback,
      url,
    });
    this.routes[Method.Options].unshift({
      call: this.defaultResponse,
      url
    });
  }

  public patch(url: string | RegExp, callback: Listener): void {
    this.routes[Method.Patch].unshift({
      call: callback,
      url,
    });
    this.routes[Method.Options].unshift({
      call: this.defaultResponse,
      url
    });
  }

  public delete(url: string | RegExp, callback: Listener): void {
    this.routes[Method.Delete].unshift({
      call: callback,
      url,
    });
    this.routes[Method.Options].unshift({
      call: this.defaultResponse,
      url
    });
  }

  public onError(handler: ErrorHandler) {
    this.errorHandler = handler;
  }
}
