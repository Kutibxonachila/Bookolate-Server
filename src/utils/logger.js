import winston, { loggers } from "winston";

const logger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

loggers.set("default", logger);

export default logger;
