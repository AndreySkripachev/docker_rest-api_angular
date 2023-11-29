declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NG_APP_VERSION: string;
    readonly NG_APP_COMMIT: string;
    readonly NG_APP_API_URL: string;
  }
}
