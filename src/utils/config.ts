import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const config = {
    telegram: {
        token: process.env.BOT_TOKEN || "xxxx",
        webhookURL: `${process.env.WEBHOOK_DOMAIN}/api/index` || "xxxx",
        allowedUsers: process.env.ALLOWED_USERS?.split(" ") || "xxxx",
        bot: {
            id: process.env.BOT_ID || "xxxx",
            firstName: process.env.BOT_NAME || "xxxx",
            username: process.env.BOT_USERNAME || "xxxx",
        },
    },
    db: {
        dataSource: process.env.MONGO_CLUSTER || "xxxx",
        database: process.env.MONGO_DATABASE || "xxxx",
        collections: {
            moods: process.env.MOOD_COLLECTION || "xxxx",
            mornings: process.env.MORNING_COLLECTION || "xxxx",
            evenings: process.env.EVENING_COLLECTION || "xxxx",
            weeks: process.env.WEEK_COLLECTION || "xxxx",
        },
        api: {
            apiKey: process.env.MONGO_API_KEY || "xxxx",
            urlEndpoint: process.env.MONGO_API_URL || "xxxx",
        },
    },
    weather: {
        apiKey: process.env.OPEN_WEATHER_API_KEY || "xxxx",
        lat: process.env.OPEN_WEATHER_API_LAT || "xxxx",
        lon: process.env.OPEN_WEATHER_API_LON || "xxxx",
    },
    isProduction: process.env.NODE_ENV === "production",
};

export default config;
