import { VercelRequest, VercelResponse } from "@vercel/node";
import { webhookCallback } from "grammy";
import bot from "../src/core/bot/index";
import "../src/index";

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: VercelRequest, res: VercelResponse, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

async function handler(req: VercelRequest, res: VercelResponse) {
    // Run the middleware
    await runMiddleware(req, res, webhookCallback(bot));
}

export default handler;
