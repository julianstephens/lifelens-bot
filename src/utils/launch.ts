import { LensContext } from "@models/index";
import { Bot } from "grammy";
import config from "./config";

const production = async (bot: Bot<LensContext>): Promise<void> => {
    try {
        await bot.api.setWebhook(config.telegram.webhookURL);
        console.log(`[SERVER] Bot starting webhook`);
    } catch (e) {
        console.error(e);
    }
};

const development = async (bot: Bot<LensContext>): Promise<void> => {
    try {
        await bot.api.deleteWebhook();
        console.log("[SERVER] Bot starting polling");
        await bot.start();
    } catch (e) {
        console.error(e);
    }
};

export { production, development };
