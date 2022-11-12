import DBContext from "../../core/db/index";
import { LensContext } from "../../models/index";

const db: DBContext = DBContext.getInstance();

const fitness = async (ctx: LensContext): Promise<void> => {
    let fitnessResp = `*Your Current Fitness Status 💪*`;

    db.collections.weeks
        ?.aggregate({
            pipeline: [{ $project: { _id: 0, fitnessGoal: 1 } }, { $sort: { date: -1 } }, { $limit: 1 }],
        })
        .then((res) => {
            const goal = res.documents[0].fitnessGoal;
            fitnessResp += `\nWeekly Goal: ${goal}`;
        })
        .catch((err) => {
            console.log(`[DB] Error retrieving fitness goal from db\n${err}`);
        });

    db.collections.mornings
        ?.aggregate({
            pipeline: [{ $project: { _id: 0, weight: 1, bmi: 1 } }, { $sort: { date: -1 } }, { $limit: 1 }],
        })
        .then((res) => {
            const weight = res.documents[0].weight;
            const bmi = res.documents[0].bmi;
            fitnessResp += `\nWeight: ${weight}\nBMI: ${bmi}`;
        });
    await ctx.reply(fitnessResp, { parse_mode: "MarkdownV2" });
};

export default fitness;
