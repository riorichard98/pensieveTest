import { Pool, QueryResult } from 'pg';

interface GpsIdsData {
  device_id: string;
}

export interface CountData {
  location: string;
  percentage: number;
}

export interface GpsData {
  device_id: string;
  device_type: string;
  timestamp: Date;
  location: string;
}

export class GpsRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  async findAllDeviceId(): Promise<GpsIdsData[]> {
    try {
      const result: QueryResult = await this.db.query(`select distinct on (device_id) device_id from gps ;`);
      return result.rows as GpsIdsData[];
    } catch (error) {
      console.error('Error in findAllDeviceId', error);
      throw error;
    }
  }

  async countLocationPercentage(id: string): Promise<CountData[]> {
    try {
      const countSqlString: string = `select "location",(count(*) * 100.0 / sum(count(*)) over (partition by device_id)) as percentage
      from gps where device_id = $1 group by device_id,"location";`
      const result: QueryResult = await this.db.query(countSqlString, [id]);
      return result.rows as CountData[];
    } catch (error) {
      console.error('Error in CountLocationPercentage', error);
      throw error;
    }
  }

  async findByDeviceId(id: string): Promise<GpsData[]> {
    try {
      const selectSqlString: string = `select g.device_id ,g.device_type ,g."timestamp",g."location" from gps g where g.device_id = $1;`
      const result: QueryResult = await this.db.query(selectSqlString, [id]);
      return result.rows as GpsData[];
    } catch (error) {
      console.error('Error in CountLocationPercentage', error);
      throw error;
    }
  }
}