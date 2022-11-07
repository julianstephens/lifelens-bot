import { LensContext } from "@models/index";
import config from "@utils/config";
import { Bot } from "grammy";

const bot = new Bot<LensContext>(config.telegram.token);

export default bot;
