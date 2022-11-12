import { Db, MongoClient } from "mongodb";
import { ICollections, IEvening, IMood, IMorning, IWeek } from "../../models/index";
import config from "../../utils/config";

let instance: any = null;

export default class DBContext {
    client: MongoClient;
    db: Db;
    collections: ICollections;

    private constructor() {
        this.client = new MongoClient(config.db.mongoURI);
        console.log(`[DB] URI ${config.db.mongoURI}`);
        this.db = this.client.db();
        this.collections = {
            moods: this.db.collection<IMood>(config.db.collections.moods),
            mornings: this.db.collection<IMorning>(config.db.collections.mornings),
            evenings: this.db.collection<IEvening>(config.db.collections.evenings),
            weeks: this.db.collection<IWeek>(config.db.collections.weeks),
        };
    }

    async connect(): Promise<void> {
        this.client = await this.client.connect();
    }

    static async init(): Promise<void> {
        if (instance) {
            return;
        }

        console.log("[DB] Connecting to db...");
        try {
            instance = new DBContext();
            await instance.connect();
        } catch (err) {
            console.log("[DB] Error connecting to db", err);
            throw err;
        }
        console.log("[DB] Connected");
    }

    static getInstance(): DBContext {
        if (!instance) {
            try {
                DBContext.init();
            } catch {
                throw Error("[DB] DB Context not initialized");
            }
        }

        return instance;
    }
}
