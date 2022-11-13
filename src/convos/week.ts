import moment from "moment";
import DBContext from "../core/db/index";
import { binaryKB, intellectKB, progressKB } from "../keyboards/index";
import { IWeek, LensContext, LensConvo, ProgressOpts } from "../models/index";

const db: DBContext = DBContext.getInstance();

const week = async (conversation: LensConvo, ctx: LensContext) => {
    let weekEntry: IWeek = { date: moment().startOf("w").unix(), uid: ctx.from?.id ?? -1 };

    await ctx.reply("Time for the weekly review 🤓\nDid you make a genuine effort at your fitness goal this week?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const fitnessEffort = ctx.callbackQuery?.data === "positive" ? true : false;
    weekEntry.fitnessEffort = fitnessEffort;

    await ctx.reply("What's your fitness goal for next week?");
    let update = await conversation.waitFor("message:text");
    weekEntry.fitnessGoal = update.message.text;

    await ctx.reply("Overall, how do you feel about your life progress this week?", { reply_markup: progressKB });
    ctx = await conversation.wait();
    const lifeProgress = ctx.callbackQuery?.data;
    weekEntry.lifeProgress = ProgressOpts[lifeProgress!];

    await ctx.reply("Do you feel like you spent enough time with family this week?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const familyTime = ctx.callbackQuery?.data === "positive" ? true : false;
    weekEntry.familyTime = familyTime;

    await ctx.reply("What about with friends?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const friendTime = ctx.callbackQuery?.data === "positive" ? true : false;
    weekEntry.friendTime = friendTime;

    await ctx.reply("Do you feel intellectually fulfilled this week?", { reply_markup: intellectKB });
    ctx = await conversation.wait();
    const intellect = ctx.callbackQuery?.data;
    weekEntry.intellectualFulfill = ProgressOpts[intellect!];

    await ctx.reply("Did you go somewhere new this week?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const newPlace = ctx.callbackQuery?.data === "positive" ? true : false;
    weekEntry.newPlace = newPlace;

    await db.collections.weeks?.insertOne({ document: weekEntry });
    console.log("[DB] Inserted week entry\n", weekEntry);
    await ctx.reply("Thanks for taking the time to reflect 💖 Your entry has been saved.");
};

export default week;
