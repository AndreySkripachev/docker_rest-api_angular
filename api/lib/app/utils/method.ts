export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
  Options = 'Options',
}

export function mapHttpMethodToMethod(method: string): Method {
  switch (method) {
    case 'GET':
      return Method.Get;
    case 'POST':
      return Method.Post;
    case 'PUT':
      return Method.Put;
    case 'PATCH':
      return Method.Patch;
    case 'DELETE':
      return Method.Delete;
    case 'OPTIONS':
      return Method.Options;
    default:
      throw new Error(`Unknown method: ${method}`);
  }
}
