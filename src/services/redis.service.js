import redis from "redis";

// Configuring the Redis client (You can adjust the host/port as per your environment)
const client = redis.createClient({
  host: "localhost", // Default is 'localhost'
  port: 6379, // Default is 6379
  // password: "yourpassword", // Uncomment if authentication is required
});

export class RedisService {
  constructor() {
    // Handling connection error
    client.on("error", (err) => {
      console.error("Redis Error: ", err);
    });

    // Optionally log when the client is connected
    client.on("connect", () => {
      console.log("Connected to Redis...");
    });
  }

  // Method to retrieve data from Redis cache
  async getValue(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, value) => {
        if (err) {
          console.error("Error getting value from Redis:", err);
          reject(err); // Reject promise on error
        }
        resolve(value ? JSON.parse(value) : null); // Parse the cached value or return null
      });
    });
  }

  // Method to set data into Redis with optional TTL (Time to Live)
  async setValue(key, value, ttl = 3600) {
    // Default TTL is 1 hour
    return new Promise((resolve, reject) => {
      client.set(key, JSON.stringify(value), "EX", ttl, (err) => {
        if (err) {
          console.error("Error setting value in Redis:", err);
          reject(err); // Reject promise on error
        }
        resolve(true); // Resolve the promise if successful
      });
    });
  }

 
  closeConnection() {
    client.quit(() => {
      console.log("Redis connection closed.");
    });
  }
}
