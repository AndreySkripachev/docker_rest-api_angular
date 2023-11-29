import { environment } from "./environment/environment";

export const apiConfig = {
  port: environment.app.port,
  host: environment.app.host,
} as const;
