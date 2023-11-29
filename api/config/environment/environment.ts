interface ProcessEnv {
  readonly POSTGRES_USER: string;
  readonly POSTGRES_PASSWORD: string;
  readonly POSTGRES_DB: string;
  readonly NODE_POSTGRES_HOST: string;
  readonly APP_HOST: string;
  readonly APP_PORT: number
}

const env = process.env as any as ProcessEnv;

export const environment = {
  postgres: {
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    host: env.NODE_POSTGRES_HOST,
  },
  app: {
    port: env.APP_PORT ?? 8080,
    host: env.APP_HOST ?? 'localhost',
  },
} as const;
