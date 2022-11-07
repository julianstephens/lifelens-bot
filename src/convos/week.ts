import DBContext from "@db/index";
import { binaryKB, intellectKB, progressKB } from "@keyboards/index";
import { IWeek, LensContext, LensConvo, ProgressOpts } from "@models/index";
import moment from "moment";

let db: DBContext;
DBContext.getInstance().then((instance) => {
    db = instance;
});
const week = async (conversation: LensConvo, ctx: LensContext) => {
    let week: IWeek = { date: moment().startOf("w").unix() };

    await ctx.reply("Time for the weekly review 🤓\nDid you make a genuine effort at your fitness goal this week?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const fitnessEffort = ctx.callbackQuery?.data === "positive" ? true : false;
    week.fitnessEffort = fitnessEffort;

    await ctx.reply("What's your fitness goal for next week?");
    let update = await conversation.waitFor("message:text");
    week.fitnessGoal = update.message.text;

    await ctx.reply("Overall, how do you feel about your life progress this week?", { reply_markup: progressKB });
    ctx = await conversation.wait();
    const lifeProgress = ctx.callbackQuery?.data;
    week.lifeProgress = ProgressOpts[lifeProgress!];

    await ctx.reply("Do you feel like you spent enough time with family this week?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const familyTime = ctx.callbackQuery?.data === "positive" ? true : false;
    week.familyTime = familyTime;

    await ctx.reply("What about with friends?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const friendTime = ctx.callbackQuery?.data === "positive" ? true : false;
    week.friendTime = friendTime;

    await ctx.reply("Do you feel intellectually fulfilled this week?", { reply_markup: intellectKB });
    ctx = await conversation.wait();
    const intellect = ctx.callbackQuery?.data;
    week.intellectualFulfill = ProgressOpts[intellect!];

    await ctx.reply("Did you go somewhere new this week?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const newPlace = ctx.callbackQuery?.data === "positive" ? true : false;
    week.newPlace = newPlace;

    await db.collections.weeks?.insertOne(week);
    await ctx.reply("Thanks for taking the time to reflect 💖 Your entry has been saved.");
};

export default week;
