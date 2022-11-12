import { Bot } from "grammy";
import { LensContext } from "../models/index";
import config from "./config";

const production = async (bot: Bot<LensContext>): Promise<void> => {
    try {
        await bot.api.setWebhook(config.telegram.webhookURL);
        console.log(`[SERVER] Bot starting webhook`);
    } catch (err) {
        console.error(err);
    }
};

const development = async (bot: Bot<LensContext>): Promise<void> => {
    try {
        await bot.api.deleteWebhook();
        console.log("[SERVER] Bot starting polling");
        await bot.start();
    } catch (err) {
        console.error(err);
    }
};

export { production, development };
