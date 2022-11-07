import { Bot } from "grammy";
import { LensContext } from "../../models/index";
import config from "../../utils/config";

const bot = new Bot<LensContext>(config.telegram.token);

export default bot;
