import { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import { Context, SessionFlavor } from "grammy";
import { MongoDBDataAPI } from "../utils/mongodb-data-api/src/index";

export type LensContext = Context & ConversationFlavor & SessionFlavor<any>;
export type LensConvo = Conversation<LensContext>;

export interface ICollections {
    moods?: MongoDBDataAPI<IMood>;
    mornings?: MongoDBDataAPI<IMorning>;
    evenings?: MongoDBDataAPI<IEvening>;
    weeks?: MongoDBDataAPI<IWeek>;
}

export interface IEntry {
    date: number;
    uid: number;
}

export interface IMood extends IEntry {
    mood: string;
}

export interface IMorning extends IEntry {
    sleepDuration?: string;
    sleepQuality?: boolean;
    fallingAsleep?: boolean;
    wakeTime?: WakeTimeOpts;
    bedTime?: BedTimeOpts;
    weight?: number;
    bmi?: number;
}

export interface IEvening extends IEntry {
    healthy?: HealthyOpts;
    exercise?: boolean;
    meditate?: boolean;
    water?: boolean;
    coffee?: number;
    veggies?: boolean;
    anxiety?: AnxietyOpts;
    outdoors?: boolean;
    focus?: string;
    excited?: FutureOpts;
}

export interface IWeek extends IEntry {
    fitnessEffort?: boolean;
    fitnessGoal?: string;
    lifeProgress?: ProgressOpts;
    familyTime?: boolean;
    friendTime?: boolean;
    intellectualFulfill?: boolean;
    newPlace?: boolean;
}

export enum Commands {
    help = "help",
    mood = "mood",
    morningJournal = "morning",
    eveningJournal = "evening",
    weekJournal = "week",
    fitness = "fitness",
    cancel = "cancel",
}

export const BotCommands = [
    {
        command: Commands.help,
        description: "list available commands",
    },
    {
        command: Commands.mood,
        description: "add a mood log entry",
    },
    {
        command: Commands.morningJournal,
        description: "add morning journal",
    },
    {
        command: Commands.eveningJournal,
        description: "add evening journal",
    },
    {
        command: Commands.weekJournal,
        description: "add week journal",
    },
    {
        command: Commands.fitness,
        description: "view fitness status",
    },
    {
        command: Commands.cancel,
        description: "exit command",
    },
];

export enum BedTimeOpts {
    EARLIEST = "Before 10PM",
    EARLY = "Between 10PM and 11PM",
    AVG = "Between 11PM and 12AM",
    LATE = "After 12AM",
}

export enum WakeTimeOpts {
    EARLIEST = "Before 6AM",
    EARLY = "Between 6AM and 7AM",
    AVG = "Between 7AM and 9AM",
    LATE = "After 9AM",
}

export enum HealthyOpts {
    VERY_UNHEALTHY = "Very unhealthy",
    UNHEALTHY = "A little unhealthy",
    OK = "Not great, but not bad either",
    GOOD = "Fairly healthy",
    GREAT = "Very healthy",
}

export enum AnxietyOpts {
    VERY_ANXIOUS = "Very anxious",
    ANXIOUS = "A little anxious",
    OK = "Pretty good, but I had a few moments",
    GREAT = "Not at all",
}

export enum FutureOpts {
    NO = "No, I'm dreading it",
    MEH = "I'm ambivalent",
    YES = "Yeah! I'm pumped",
}

export enum ProgressOpts {
    VERY_UNHAPPY = "Very unhappy",
    UNHAPPY = "A little unhappy",
    OK = "Not great, but not bad either",
    GOOD = "A little progress was made",
    CONTENT = "I made progress and feel fulfilled",
}

export enum IntellectOpts {
    NO = "Not at all",
    LITTLE = "A little",
    VERY = "Very fulfilled",
}
