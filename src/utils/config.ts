import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const config = {
    telegram: {
        token: process.env.TOKEN || "xxxx",
        webhookURL: `${process.env.WEBHOOK_DOMAIN}/api/index` || "xxxx",
    },
    db: {
        mongoURI: process.env.MONGO_URI ?? "xxxx",
        name: process.env.DB_NAME || "xxxx",
        collections: {
            moods: process.env.MOOD_COLLECTION || "xxxx",
            mornings: process.env.MORNING_COLLECTION || "xxxx",
            evenings: process.env.EVENING_COLLECTION || "xxxx",
            weeks: process.env.WEEK_COLLECTION || "xxxx",
        },
    },
    gcloud: {
        region: process.env.GCLOUD_REGION || "xxxx",
        projectId: process.env.GCLOUD_PROJECT || "xxxx",
        functionTarget: process.env.FUNCTION_TARGET || "xxxx",
    },
    isProduction: process.env.NODE_ENV === "production",
};

export default config;
