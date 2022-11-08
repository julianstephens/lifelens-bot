import moment from "moment";
import DBContext from "../core/db/index";
import * as durations from "../durations.json";
import { bedKB, binaryKB, wakeKB } from "../keyboards/index";
import { BedTimeOpts, IMorning, LensContext, LensConvo, WakeTimeOpts } from "../models/index";

const db: DBContext = DBContext.getInstance();

const morning = async (conversation: LensConvo, ctx: LensContext) => {
    let morning: IMorning = { date: moment().startOf("d").unix() };

    // Save sleep quality resp
    await ctx.reply("Good morning 👋 Did you sleep well?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const sleepQuality = ctx.callbackQuery?.data === "positive" ? true : false;
    morning.sleepQuality = sleepQuality;
    conversation.log("Added date and sleep quality:\n", morning);

    // Save wake time resp
    await ctx.reply("What time did you wake up?", { reply_markup: wakeKB });
    ctx = await conversation.wait();
    const wakeTime = ctx.callbackQuery?.data;
    morning.wakeTime = WakeTimeOpts[wakeTime!];
    conversation.log("Added wake time:\n", morning);

    // Save bed time resp
    await ctx.reply("What time did you go to bed?", { reply_markup: bedKB });
    ctx = await conversation.wait();
    const bedTime = ctx.callbackQuery?.data;
    morning.bedTime = BedTimeOpts[bedTime!];
    conversation.log("Added bed time:\n", morning);

    // Save sleep duration resp
    const sleepDuration = durations[`${morning.wakeTime}:${morning.bedTime}`];
    morning.sleepDuration = sleepDuration;
    conversation.log("Added sleep duration:\n", morning);

    // Save weight resp
    await ctx.reply("How much do you weigh this morning?");
    let update = await conversation.waitFor("message:text");
    morning.weight = Number.parseInt(update.message.text, 10);
    conversation.log("Added weight:\n", morning);

    // Save bmi resp
    await ctx.reply("Got it. What was your BMI?");
    update = await conversation.waitFor("message:text");
    morning.bmi = Number.parseInt(update.message.text, 10);
    conversation.log("Added bmi:\n", morning);

    await db.collections.mornings?.insertOne(morning);
    await ctx.reply("Awesome! Your morning journal has been saved. Have a great day 💯");
};

export default morning;
