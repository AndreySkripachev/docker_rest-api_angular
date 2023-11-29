import { ConnectionConfig } from 'pg'
import { environment } from './environment/environment'

const { host, password, user } = environment.postgres

export const postgresConfig: ConnectionConfig = {
  user, password, host,
} as const;
