import moment from "moment";
import DBContext from "../core/db/index";
import { IMood, LensContext, LensConvo } from "../models/index";

const db: DBContext = DBContext.getInstance();

const mood = async (conversation: LensConvo, ctx: LensContext) => {
    await ctx.reply("How are you feeling?");
    const {
        message: { text },
    } = await conversation.waitFor("message:text");
    const moodEntry: IMood = {
        date: moment().startOf("d").unix(),
        uid: ctx.from?.id ?? -1,
        mood: text,
    };
    await db.collections.moods?.insertOne({ document: moodEntry });
    console.log("[DB] Inserted mood entry\n", moodEntry);
    await ctx.reply("Your mood log has been entered successfully 👍");
};

export default mood;
