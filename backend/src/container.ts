import GpsService from "./usecase/gps";
import OnboardService from "./usecase/onboard";

import { DbConfig,AppConfig } from "./pkg/config";
import { getEnv } from "./utils/getEnv";

import Pgsql from "./connection/postgre";
import { UserRepository } from "./domain/userRepo";
import { GpsRepository } from "./domain/gpsRepo";

export default class Container{
    public gpsService!:GpsService; //ensure this are assigned before this are used
    public onboardService!:OnboardService;  //ensure this are assigned before this are used
    public dbConf!:DbConfig;  //ensure this are assigned before this are used
    public appConf!:AppConfig;  //ensure this are assigned before this are used
    async init(){
        const appName = getEnv("APP_NAME")
        const dbUsername = getEnv("PGSQL_USERNAME")
        const dbHost = getEnv("PGSQL_HOST")
        const dbName = getEnv("PGSQL_DBNAME")
        this.appConf = {
            appName,
            appPort:Number(process.env.APP_PORT) || 4000,
            appAddress:process.env.APP_ADDRESS || "localhost"
        };

        this.dbConf = {
            dbUsername,
            dbHost,
            dbName,
            dbPort:Number(process.env.PGSQL_PORT) || 5432 // common pgsql port
        };

        // databases
        const pgsqlDb = new Pgsql(this.dbConf);
        const validDB:boolean = await pgsqlDb.validateConnection();
        if (!validDB){
            console.error("DB CONNECTION IS NOT VALID");
            process.exit(1);
        }

        // repositories
        const gpsRepo = new GpsRepository(pgsqlDb.pool);
        const userRepo = new UserRepository(pgsqlDb.pool);

        // services 
        this.onboardService = new OnboardService(userRepo);
        this.gpsService = new GpsService(gpsRepo)

        this.validateConfig(this.appConf, 'App Config');
        this.validateConfig(this.dbConf, 'DB Config');

    }

    // validate all configs so that it doesn't have falsy properties
    private validateConfig(config: Record<string, any>, configName: string) {
        const missingProps = Object.keys(config).filter(prop => !config[prop]);

        if (missingProps.length > 0) {
            console.error(`${configName} has the following falsy properties: ${missingProps.join(', ')}`);
            process.exit(1);
        }
    }
}