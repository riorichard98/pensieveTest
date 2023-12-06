import { Pool } from 'pg';

import { DbConfig } from '../pkg/config';

export default class Pgsql {
  public pool: Pool;

  constructor(dbConf: DbConfig) {
    this.pool = new Pool({
      user: dbConf.dbUsername,
      host: dbConf.dbHost,
      database: dbConf.dbName,
      port: dbConf.dbPort,
    });
  }

  async validateConnection(): Promise<boolean> {
    try {
      const result = await this.pool.query('SELECT 1');
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error validating database connection:', error);
      return false;
    }
  }
}

