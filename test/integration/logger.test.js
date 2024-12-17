import logger from "../../src/utils/logger.js"; // Import logger

describe("Logging Test", () => {
  it("should log messages with Winston", () => {
    logger.debug("Debugging with Winston logger");
    logger.info("Informational message");
    logger.error("Error message");
    // Here you could also mock the logger or check log files if necessary
  });
});
