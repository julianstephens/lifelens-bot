import { GrammyError, HttpError } from "grammy";

const errorHandler = (err: any) => {
    const ctx = err.ctx;
    console.error(`[SERVER] Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("[SERVER] Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("[SERVER] Could not contact Telegram:", e);
    } else {
        console.error("[SERVER] Unknown error:", e);
    }
};

export default errorHandler;
