import winston, { loggers } from "winston";

const logger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

loggers.add("default", logger);
logger.info("This is info message");

export default logger;
