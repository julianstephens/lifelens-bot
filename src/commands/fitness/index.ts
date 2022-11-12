import DBContext from "../../core/db/index";
import { LensContext } from "../../models/index";

const db: DBContext = DBContext.getInstance();

const fitness = async (ctx: LensContext): Promise<void> => {
    let fitnessResp = `*Your Current Fitness Status 💪*`;

    const goal = await db.collections.weeks?.aggregate({
        pipeline: [{ $project: { _id: 0, fitnessGoal: 1 } }, { $sort: { date: -1 } }, { $limit: 1 }],
    });
    if (goal && goal.documents) {
        fitnessResp += `\nWeekly Goal: ${goal.documents[0]?.fitnessGoal}`;
        console.log("[DB] Retrieved\n", goal.documents[0]);
    }

    const health = await db.collections.mornings?.aggregate({
        pipeline: [{ $project: { _id: 0, weight: 1, bmi: 1 } }, { $sort: { date: -1 } }, { $limit: 1 }],
    });
    if (health && health.documents) {
        fitnessResp += `\nWeight: ${health.documents[0]?.weight}\nBMI: ${health.documents[0]?.bmi}`;
        console.log("[DB] Retrieved\n", health.documents[0]);
    }

    await ctx.reply(fitnessResp, { parse_mode: "MarkdownV2" });
};

export default fitness;
