import { getLogger, handlers, setup } from "./deps.ts";

await setup({
    handlers: {
        fileHandler: new handlers.RotatingFileHandler("DEBUG", {
            filename: "/var/tmp/log/contentServer.log",
            maxBytes: 10000,
            maxBackupCount: 3,
            formatter: (rec) =>
                JSON.stringify({
                    region: rec.loggerName,
                    ts: rec.datetime,
                    level: rec.levelName,
                    data: rec.msg,
                }),
        }),
    },
    loggers: {
        default: {
            level: "DEBUG",
            handlers: ["fileHandler"],
        },
    },
});

export const log = getLogger();
