import moment from "moment";
import fetch from "node-fetch";
import DBContext from "../../core/db/index";
import { LensContext } from "../../models/index";
import config from "../../utils/config";

const db: DBContext = DBContext.getInstance();

const weather = async (ctx: LensContext): Promise<void> => {
    let weatherResp = `*Tomorrow's Weather Forecast 😎*
\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-
`;

    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${config.weather.lat}&lon=${config.weather.lon}&appid=${config.weather.apiKey}&units=Imperial`;
    const resp = await fetch(url, {
        method: "GET",
    });

    if (!resp.ok) {
        console.error("[SERVER] ", resp);
        await ctx.reply("Could not retrieve tomorrow's weather forecast.");
        return;
    }

    const { list, city } = await resp.json();
    console.log("[SERVER] Got weather resp");

    const tmrw = list.filter((curr) => moment.unix(curr["dt"]).isSame(moment().add(1, "d"), "day"));
    if (!tmrw || tmrw.length <= 0) {
        await ctx.reply("Could not retrieve tomorrow's weather forecast.");
        return;
    }

    const maxHigh = Math.round(tmrw.reduce((a, b) => (a["main"]["temp_max"] > b["main"]["temp_max"] ? a : b))["main"]["temp_max"]);
    const minLow = Math.round(tmrw.reduce((a, b) => (a["main"]["temp_min"] < b["main"]["temp_min"] ? a : b))["main"]["temp_min"]);
    const avgWindSpeed = Math.round(tmrw.reduce((prev, curr) => prev + curr["wind"]["speed"], 0) / tmrw.length);
    const precip = Math.round((tmrw.reduce((prev, curr) => prev + curr["pop"], 0) / tmrw.length) * 100);
    const snow = tmrw.some((el) => el.hasOwnProperty("snow"));
    const { sunrise, sunset, timezone } = city;
    console.log(`[SERVER] sunrise: ${sunrise} sunset: ${sunset} offset: ${timezone}`);
    const formattedSunrise = moment
        .unix(sunrise)
        .utcOffset(timezone / 60)
        .format("hh:mm");
    const formattedSunset = moment
        .unix(sunset)
        .utcOffset(timezone / 60)
        .format("hh:mm");

    weatherResp += `High Temp: ${maxHigh}
Low Temp: ${minLow}
Avg Wind Speed: ${avgWindSpeed} mph
Chance of Precipitation: ${precip}\\%
Will it Snow? ${snow ? "Yep!" : "No"}
Sunrise: ${formattedSunrise} am
Sunset: ${formattedSunset} pm
    `;
    await ctx.reply(weatherResp, { parse_mode: "MarkdownV2" });
};

export default weather;
