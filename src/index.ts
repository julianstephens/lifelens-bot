import "module-alias/register";
//leave here
import bot from "@bot/index";
import commands from "@commands/index";
import evening from "@convos/evening";
import mood from "@convos/mood";
import morning from "@convos/morning";
import week from "@convos/week";
import { conversations, createConversation } from "@grammyjs/conversations";
import auth from "@utils/auth";
import config from "@utils/config";
import errorHandler from "@utils/error-handler";
import { development, production } from "@utils/launch";
import { session } from "grammy";
import { BotCommands, ISession } from "./models";

bot.use(auth);
bot.use(session({ initial: () => ({} as ISession) }));
bot.use(conversations());
bot.use(createConversation(mood));
bot.use(createConversation(morning));
bot.use(createConversation(evening));
bot.use(createConversation(week));
bot.use(commands);
bot.api.setMyCommands(BotCommands);
bot.catch(errorHandler);

!config.isProduction ? development(bot) : production(bot);

export { };

