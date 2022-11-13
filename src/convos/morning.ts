import moment from "moment";
import DBContext from "../core/db/index";
import * as durations from "../durations.json";
import { bedKB, binaryKB, wakeKB } from "../keyboards/index";
import { BedTimeOpts, IMorning, LensContext, LensConvo, WakeTimeOpts } from "../models/index";

const db: DBContext = DBContext.getInstance();

const morning = async (conversation: LensConvo, ctx: LensContext) => {
    let morningEntry: IMorning = { date: moment().startOf("d").unix(), uid: ctx.from?.id ?? -1 };

    // Save sleep quality resp
    await ctx.reply("Good morning 👋 Did you sleep well?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const sleepQuality = ctx.callbackQuery?.data === "positive" ? true : false;
    morningEntry.sleepQuality = sleepQuality;
    conversation.log("Added date and sleep quality:\n", morningEntry);

    // Save wake time resp
    await ctx.reply("What time did you wake up?", { reply_markup: wakeKB });
    ctx = await conversation.wait();
    const wakeTime = ctx.callbackQuery?.data;
    morningEntry.wakeTime = WakeTimeOpts[wakeTime!];
    conversation.log("Added wake time:\n", morningEntry);

    // Save bed time resp
    await ctx.reply("What time did you go to bed?", { reply_markup: bedKB });
    ctx = await conversation.wait();
    const bedTime = ctx.callbackQuery?.data;
    morningEntry.bedTime = BedTimeOpts[bedTime!];
    conversation.log("Added bed time:\n", morningEntry);

    // Save sleep duration resp
    const sleepDuration = durations[`${morningEntry.wakeTime}:${morningEntry.bedTime}`];
    morningEntry.sleepDuration = sleepDuration;
    conversation.log("Added sleep duration:\n", morningEntry);

    // Save weight resp
    await ctx.reply("How much do you weigh this morning?");
    let update = await conversation.waitFor("message:text");
    morningEntry.weight = Number.parseFloat(update.message.text);
    conversation.log("Added weight:\n", morningEntry);

    // Save bmi resp
    await ctx.reply("Got it. What was your BMI?");
    update = await conversation.waitFor("message:text");
    morningEntry.bmi = Number.parseFloat(update.message.text);
    conversation.log("Added bmi:\n", morningEntry);

    await conversation.external(() => db.collections.mornings?.insertOne({ document: morningEntry }));
    console.log("[DB] Inserted morning entry");
    await ctx.reply("Awesome! Your morning journal has been saved. Have a great day 💯");
};

export default morning;
