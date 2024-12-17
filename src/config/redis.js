import redis from "redis";

// Connect to Redis (ensure Redis server is running)
const client = redis.createClient({
  host: "localhost", // Redis server host
  port: 6379, // Redis default port
});

// Log errors
client.on("error", (err) => {
  console.log("Redis error:", err);
});

export default client;
