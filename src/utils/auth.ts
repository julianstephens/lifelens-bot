import { Middleware } from "grammy";
import { LensContext } from "../models/index";
import config from "./config";

const auth: Middleware<LensContext> = async (ctx: LensContext, next: any) => {
    console.log("User attempted to access bot:\n", ctx.from);

    const user = ctx.from?.id;

    if (user && config.telegram.allowedUsers.includes(user + "")) return next();

    await ctx.reply(`User${user ? ` (${user})` : ""} is not allowed.`);
};

export default auth;
