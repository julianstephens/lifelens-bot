import moment from "moment";
import DBContext from "../../core/db/index";
import { LensContext } from "../../models/index";

const db: DBContext = DBContext.getInstance();

const warmup = async (ctx: LensContext): Promise<void> => {
    let warmupResp = `*Warmup Routine 🧗‍♂️*`;
    warmupResp += `
      - 10min jogging
      - Updog - 10 reps
      - Side lunges - 10 reps each side
      - Upper trunk rotations - 10 reps each side
      - Lower trunk rotations - 10 reps each side
    `;

    const climbingDays = [0, 2, 5];
    const now = moment();
    if (climbingDays.includes(now.day())) {
        warmupResp += `
        - Finger curls - 10 reps
        - Wrist circles - 10 reps
        - Arm circles - 10 reps
        - Hip circles - 10 reps
        - Knee/ankle circles - 10 reps
        - 8 V0-V1 problems
       `;
    }

    await ctx.reply(warmupResp, { parse_mode: "MarkdownV2" });
};

export default warmup;
