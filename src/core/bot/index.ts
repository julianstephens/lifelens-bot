import { Bot } from "grammy";
import { UserFromGetMe } from "grammy/out/types.node";
import { LensContext } from "../../models/index";
import config from "../../utils/config";

const user: UserFromGetMe = {
    id: Number.parseInt(config.telegram.bot.id, 10),
    is_bot: true,
    first_name: config.telegram.bot.firstName,
    username: config.telegram.bot.username,
    can_join_groups: true,
    can_read_all_group_messages: false,
    supports_inline_queries: false,
};
const bot = new Bot<LensContext>(config.telegram.token, { botInfo: user });

export default bot;
