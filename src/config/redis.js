import { createClient } from "redis"; // Node-Redis v4+
import { Redis } from "@upstash/redis"; // Upstash Redis SDK

// Node-Redis client setup
const client = createClient({
  url: "rediss://default:Ac_gAAIjcDEwYjNlOTRjNTExMDY0NzUwODIzMTAyMDk5MDM0N2Q0ZXAxMA@romantic-spider-53216.upstash.io:6379"
});

client.on("error", (err) => {
  console.error("Redis error (node-redis):", err);
});

// Connect to Redis (node-redis)
async function connectRedis() {
  try {
    await client.connect();
    console.log("🚀 Connected to Redis (node-redis) successfully.");
  } catch (err) {
    console.error("💥 Failed to connect to Redis (node-redis):", err);
  }
}

// Upstash Redis setup
const upstashRedis = new Redis({
  url: "https://romantic-spider-53216.upstash.io",
  token: "Ac_gAAIjcDEwYjNlOTRjNTExMDY0NzUwODIzMTAyMDk5MDM0N2Q0ZXAxMA",
});

// Example with Upstash Redis
async function useUpstashRedis() {
  try {
    await upstashRedis.set("foo", "bar");
    const data = await upstashRedis.get("foo");
    console.log("🚀 Upstash Redis data (foo):", data);
  } catch (err) {
    console.error("💥 Upstash Redis error:", err);
  }
}

// Initialize both clients
async function initializeRedis() {
  await connectRedis(); // Node-Redis connection
  await useUpstashRedis(); // Upstash Redis interaction
}

initializeRedis();

// Export Node-Redis client for further use
export default client;
