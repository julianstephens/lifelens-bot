export default function checkEnv(config: any) {
    Object.keys(config).forEach((k) => {
        if (typeof config[k] === "object") {
            checkEnv(config[k]);
        }
        if (typeof config[k] === "string" && config[k] === "xxxx") {
            throw Error(`[SERVER] Env var '${k}' not set`);
        }
    });
}
