import moment from "moment";

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

const bedLabels = Object.values(BedTimeOpts);
const wakeLabels = Object.values(WakeTimeOpts);

const regex = /\d+/g;
let matches;
const bedDict = {};
bedLabels.forEach((b, i) => {
    const timeArr: number[] = [];
    while ((matches = regex.exec(b)) != null) {
        if (matches.length > 0) {
            const time = Number.parseInt(matches[0], 10) + 12 < 24 ? Number.parseInt(matches[0], 10) + 12 : 0;
            timeArr.push(time);
        }
    }
    bedDict[bedLabels[i]] = timeArr;
});

const wakeDict = {};
wakeLabels.forEach((w, i) => {
    const timeArr: number[] = [];
    while ((matches = regex.exec(w)) != null) {
        if (matches.length > 0) {
            timeArr.push(Number.parseInt(matches[0], 10));
        }
    }
    wakeDict[wakeLabels[i]] = timeArr;
});

const res = {};
Object.entries(wakeDict).forEach((w) => {
    const wakeLabel = w[0];
    const wakeTimes = w[1] as number[];

    Object.entries(bedDict).forEach((b) => {
        const bedLabel = b[0];
        const bedTimes = b[1] as number[];

        if (bedTimes.length > wakeTimes.length) {
            const t1 = bedTimes[1] === 0 ? moment("1970-01-02").startOf("d") : moment("1970-01-01").hour(bedTimes[1]);
            const t2 = moment("1970-01-02").hour(wakeTimes[0]);
            const dur = `${wakeLabel.toLowerCase().includes("after") ? ">" : "<"} ${t2.diff(t1, "h")}`;
            res[`${wakeLabel}:${bedLabel}`] = dur;
        } else if (bedTimes.length < wakeTimes.length) {
            const t1 = bedTimes[0] === 0 ? moment("1970-01-02").startOf("d") : moment("1970-01-01").hour(bedTimes[0]);
            const t2 = moment("1970-01-02").hour(wakeTimes[1]);
            const dur = `${bedLabel.toLowerCase().includes("before") ? ">" : "<"} ${t2.diff(t1, "h")}`;
            res[`${wakeLabel}:${bedLabel}`] = dur;
        } else if (bedTimes.length === wakeTimes.length && bedTimes.length === 2) {
            const b1 = bedTimes[0] === 0 ? moment("1970-01-02").startOf("d") : moment("1970-01-01").hour(bedTimes[0]);
            const b2 = bedTimes[1] === 0 ? moment("1970-01-02").startOf("d") : moment("1970-01-01").hour(bedTimes[1]);
            const w1 = moment("1970-01-02").hour(wakeTimes[0]);
            const w2 = moment("1970-01-02").hour(wakeTimes[1]);
            const dur = `${w1.diff(b2, "h")} - ${w2.diff(b1, "h")}`;
            res[`${wakeLabel}:${bedLabel}`] = dur;
        } else {
            const t1 = bedTimes[0] === 0 ? moment("1970-01-02").startOf("d") : moment("1970-01-01").hour(bedTimes[0]);
            const t2 = moment("1970-01-02").hour(wakeTimes[0]);
            const approx =
                (bedLabel.toLowerCase().includes("before") && wakeLabel.toLowerCase().includes("before")) ||
                (bedLabel.toLowerCase().includes("after") && wakeLabel.toLowerCase().includes("after"));
            const sign = approx ? "~" : bedLabel.toLowerCase().includes("before") ? "<" : ">";
            const dur = `${sign} ${t2.diff(t1, "h")}`;
            res[`${wakeLabel}:${bedLabel}`] = dur;
        }
    });
});

console.log("/*****************************************/");
console.log(res);
