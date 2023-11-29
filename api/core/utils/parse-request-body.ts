import { IncomingMessage } from "http";

export function parseRequestBody<T = any>(req: IncomingMessage): Promise<T> {
  return new Promise((res, rej) => {
    const chunks: any[] = [];
    req.on('data', chunk => chunks.push(chunk));

    req.on('end', () => {
      const body = Buffer.concat(chunks);
      res(JSON.parse(body.toString()) as T);
    })
  })
}
