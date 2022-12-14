import { conversations, createConversation } from "@grammyjs/conversations";
import { session } from "grammy";
import commands from "./commands/index";
import evening from "./convos/evening";
import mood from "./convos/mood";
import morning from "./convos/morning";
import week from "./convos/week";
import bot from "./core/bot/index";
import { BotCommands } from "./models";
import auth from "./utils/auth";
import checkEnv from "./utils/check-env";
import config from "./utils/config";
import errorHandler from "./utils/error-handler";
import { development, production } from "./utils/launch";

checkEnv(config);
bot.use(auth);
bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.command("cancel", async (ctx) => {
    await ctx.conversation.exit();
    await ctx.reply("Leaving.");
});
bot.use(createConversation(mood));
bot.use(createConversation(morning));
bot.use(createConversation(evening));
bot.use(createConversation(week));
bot.use(commands);
(async () => {
    try {
        await bot.api.setMyCommands(BotCommands);
    } catch (err) {
        console.log("[SERVER] ", err);
    }
})();
bot.catch(errorHandler);

!config.isProduction ? development(bot) : production(bot);

export {};
