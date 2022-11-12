import { ICollections, IEvening, IMood, IMorning, IWeek } from "../../models/index";
import config from "../../utils/config";
import { MongoDBDataAPI } from "../../utils/mongodb-data-api";

let instance: any = null;

export default class DBContext {
    collections: ICollections;

    private constructor() {
        this.collections = {
            moods: new MongoDBDataAPI<IMood>(config.db.api, {
                dataSource: config.db.dataSource,
                database: config.db.database,
                collection: config.db.collections.moods,
            }),
            mornings: new MongoDBDataAPI<IMorning>(config.db.api, {
                dataSource: config.db.dataSource,
                database: config.db.database,
                collection: config.db.collections.mornings,
            }),
            evenings: new MongoDBDataAPI<IEvening>(config.db.api, {
                dataSource: config.db.dataSource,
                database: config.db.database,
                collection: config.db.collections.evenings,
            }),
            weeks: new MongoDBDataAPI<IWeek>(config.db.api, {
                dataSource: config.db.dataSource,
                database: config.db.database,
                collection: config.db.collections.weeks,
            }),
        };
    }

    static getInstance(): DBContext {
        if (!instance) {
            try {
                console.log("[DB] Creating data APIs");
                instance = new DBContext();
                console.log("[DB] Connected");
            } catch (err) {
                console.log("[DB] Something went wrong creating the DB Context");
                throw err;
            }
        }

        return instance;
    }
}
