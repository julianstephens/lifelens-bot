import { BotCommands, Commands, LensContext } from "@models/index";
import { Composer } from "grammy";
import fitness from "./fitness";

const composer = new Composer<LensContext>();

composer.command("help", async (ctx: LensContext) => {
    const info = BotCommands.reduce((acc, val) => `${acc}/${val.command} - ${val.description}\n`, "");
    await ctx.reply(`Here's all the things I can do!\n\n${info}`);
});
composer.command(Commands.fitness, fitness);
composer.command(Commands.mood, async (ctx: LensContext) => {
    await ctx.conversation.enter("mood");
});
composer.command(Commands.morningJournal, async (ctx: LensContext) => {
    await ctx.conversation.enter("morning");
});
composer.command(Commands.eveningJournal, async (ctx: LensContext) => {
    await ctx.conversation.enter("evening");
});
composer.command(Commands.weekJournal, async (ctx: LensContext) => {
    await ctx.conversation.enter("week");
});

export default composer;
