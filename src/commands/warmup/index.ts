import moment from "moment";
import DBContext from "../../core/db/index";
import { LensContext } from "../../models/index";

const db: DBContext = DBContext.getInstance();

const warmup = async (ctx: LensContext): Promise<void> => {
    let warmupResp = `*Warmup Routine 🧗‍♂️*`;
    warmupResp += `
  \\* 10min jogging
  \\* Updog
  \\* Side lunges
  \\* Upper trunk rotations
  \\* Lower trunk rotations
    `;

    const climbingDays = [0, 2, 5];
    const now = moment();
    if (climbingDays.includes(now.day())) {
        warmupResp += `
  \\* Finger curls
  \\* Wrist circles
  \\* Arm circles
  \\* Hip circles
  \\* Knee/ankle circles
  \\* 8 V0\\-V1 problems
       `;
    }

    await ctx.reply(warmupResp, { parse_mode: "MarkdownV2" });
};

export default warmup;
