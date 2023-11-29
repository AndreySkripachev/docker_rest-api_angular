import { Client } from "pg";

import { postgresConfig } from '../config'

export const databaseClient = new Client(postgresConfig);

databaseClient.connect()
  .then(() => console.log('Connected to the database'));
