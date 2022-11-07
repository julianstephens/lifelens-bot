import moment from "moment";
import DBContext from "../core/db/index";
import { anxietyKB, binaryKB, excitedKB, healthyKB } from "../keyboards/index";
import { AnxietyOpts, FutureOpts, HealthyOpts, IEvening, LensContext, LensConvo } from "../models/index";

let db: DBContext;
DBContext.getInstance().then((instance) => {
    db = instance;
});

const evening = async (conversation: LensConvo, ctx: LensContext) => {
    let evening: IEvening = { date: moment().startOf("d").unix() };

    await ctx.reply("Good evening! How healthy do you feel today?", { reply_markup: healthyKB });
    ctx = await conversation.wait();
    const healthy = ctx.callbackQuery?.data;
    evening.healthy = HealthyOpts[healthy!];

    await ctx.reply("Did you get exercise today?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const exercise = ctx.callbackQuery?.data === "positive" ? true : false;
    evening.exercise = exercise;

    await ctx.reply("Did you meditate?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const meditate = ctx.callbackQuery?.data === "positive" ? true : false;
    evening.meditate = meditate;

    await ctx.reply("Did you drink enough water?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const water = ctx.callbackQuery?.data === "positive" ? true : false;
    evening.water = water;

    await ctx.reply("How many cups of coffee did you have?");
    let update = await conversation.waitFor("message:text");
    evening.coffee = Number.parseInt(update.message.text, 10);

    await ctx.reply("Did you eat vegetables today?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const veggies = ctx.callbackQuery?.data === "positive" ? true : false;
    evening.veggies = veggies;

    await ctx.reply("Have you felt anxiuos today?", { reply_markup: anxietyKB });
    ctx = await conversation.wait();
    const anxiety = ctx.callbackQuery?.data;
    evening.anxiety = AnxietyOpts[anxiety!];

    await ctx.reply("Did you go outside?", { reply_markup: binaryKB });
    ctx = await conversation.wait();
    const outside = ctx.callbackQuery?.data === "positive" ? true : false;
    evening.outdoors = outside;

    await ctx.reply("What time did you start smoking?");
    update = await conversation.waitFor("message:text");
    evening.smoke = update.message.text;

    await ctx.reply("What was your main focus for today?");
    update = await conversation.waitFor("message:text");
    evening.focus = update.message.text;

    await ctx.reply("Do you feel excited about what's ahead in the future?", { reply_markup: excitedKB });
    ctx = await conversation.wait();
    const excited = ctx.callbackQuery?.data;
    evening.excited = FutureOpts[excited!];

    await db.collections.evenings?.insertOne(evening);
    await ctx.reply("Your entry has been saved. Have a great night 💤");
};

export default evening;
