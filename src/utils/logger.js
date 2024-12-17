import winston from "winston";

// Configure logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamps
    winston.format.printf(
      ({ level, message, timestamp }) =>
        `${timestamp}  [${level.toUpperCase()}] :  ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.colorize({ all: true }), // Colorize console logs
    }),
    new winston.transports.File({
      filename: "../logs/error.log",
      level: "error", // Use the string "error"
    }), // Error logs
    new winston.transports.File({
      filename: "../logs/combined.log",
    }), // All logs
  ],
});

logger.debug("This is a debug message");
logger.info("This is an info message");
logger.error("This is an error message");

export default logger;
