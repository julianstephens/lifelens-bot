import DBContext from "@db/index";
import { LensContext } from "@models/index";

let db: DBContext;
DBContext.getInstance().then((instance) => {
    db = instance;
});

const fitness = async (ctx: LensContext): Promise<void> => {
    const goalCursor = db.collections.weeks
        ?.find()
        .sort({ date: -1 })
        .limit(1)
        .project<{ fitnessGoal: string }>({
            _id: 0,
            fitnessGoal: { $convert: { input: "$fitnessGoal", to: "string" } },
        });
    const goal = await goalCursor?.toArray();
    const bodyCursor = db.collections.mornings?.find().sort({ date: -1 }).limit(1).project<{ bmi: number; weight: number }>({
        _id: 0,
        weight: true,
        bmi: true,
    });
    const body = await bodyCursor?.toArray();
    await ctx.reply(
        `*Your Current Fitness Status 💪*
  ${goal ? `Weekly Goal: ${goal[0].fitnessGoal}` : ""}
  ${body ? `Weight: ${body[0].weight}` : ""}
  ${body ? `BMI: ${body[0].bmi}` : ""}
        `,
        { parse_mode: "MarkdownV2" },
    );
};

export default fitness;
