import { AnxietyOpts, BedTimeOpts, FutureOpts, HealthyOpts, IntellectOpts, ProgressOpts, WakeTimeOpts } from "@models/index";
import { InlineKeyboard } from "grammy";

const makeKB = (kb: InlineKeyboard, opts: any) => {
    Object.keys(opts).forEach((k) => {
        kb.text(opts[k], k).row();
    });
};

export const binaryKB = new InlineKeyboard().text("Yep!", "positive").text("No :/", "negative");

export const wakeKB = new InlineKeyboard();
makeKB(wakeKB, WakeTimeOpts);

export const bedKB = new InlineKeyboard();
makeKB(bedKB, BedTimeOpts);

export const healthyKB = new InlineKeyboard();
makeKB(healthyKB, HealthyOpts);

export const anxietyKB = new InlineKeyboard();
makeKB(anxietyKB, AnxietyOpts);

export const excitedKB = new InlineKeyboard();
makeKB(excitedKB, FutureOpts);

export const progressKB = new InlineKeyboard();
makeKB(progressKB, ProgressOpts);

export const intellectKB = new InlineKeyboard();
makeKB(intellectKB, IntellectOpts);
