import cron from "node-cron";
import redis from "../redisClient.js";

cron.schedule("*/30 * * * * *", () => {
  redis.flushdb((err, success) => {
    if (err) {
      console.error("Error clearing cache:", err);
    } else {
      console.log("Cache cleared successfully:", success);
    }
  });
});
