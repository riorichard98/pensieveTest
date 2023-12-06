import { Pool, QueryResult } from 'pg';

export interface UserData {
    user_id: number;
    name: string;
    email: string;
    login_token: string;
    password:string
}

export class UserRepository {
    private db: Pool;

    constructor(db: Pool) {
        this.db = db;
    }

    async findUserByEmail(email: string): Promise<UserData[]> {
        try {
            const selectSqlString: string = `select *  from users u where u.email = $1;`
            const result: QueryResult = await this.db.query(selectSqlString, [email]);
            return result.rows as UserData[];
        } catch (error) {
            console.error('Error in findUserByEmail', error);
            throw error;
        }
    }

    async updateLoginToken(email: string, newToken: string): Promise<boolean> {
        try {
            const updateSqlString: string = `update  users set login_token = $1 where email = $2;`
            const result: QueryResult = await this.db.query(updateSqlString, [newToken,email]);
            return !!result.rowCount && result.rowCount > 0;
        } catch (error) {
            console.error('Error in findUserByEmail', error);
            throw error;
        }
    }
}
