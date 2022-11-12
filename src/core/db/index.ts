import { MongoDBDataAPI } from "mongodb-data-api";
import { ICollections, IEvening, IMood, IMorning, IWeek } from "../../models/index";
import config from "../../utils/config";

let instance: any = null;

export default class DBContext {
    collections: ICollections;

    private constructor() {
        this.collections = {
            moods: new MongoDBDataAPI<IMood>(config.api, {
                dataSource: config.db.dataSource,
                database: config.db.database,
                collection: config.db.collections.moods,
            }),
            mornings: new MongoDBDataAPI<IMorning>(config.api, {
                dataSource: config.db.dataSource,
                database: config.db.database,
                collection: config.db.collections.mornings,
            }),
            evenings: new MongoDBDataAPI<IEvening>(config.api, {
                dataSource: config.db.dataSource,
                database: config.db.database,
                collection: config.db.collections.evenings,
            }),
            weeks: new MongoDBDataAPI<IWeek>(config.api, {
                dataSource: config.db.dataSource,
                database: config.db.database,
                collection: config.db.collections.weeks,
            }),
        };
    }

    static getInstance(): DBContext {
        if (!instance) {
            try {
                instance = new DBContext();
            } catch (err) {
                console.log("[DB] Something went wrong creating the DB Context");
                throw err;
            }
        }

        return instance;
    }
}
