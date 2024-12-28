import { createClient } from "redis"; // Correct import for node-redis v4+

// Create Redis client with IPv4 address explicitly
const client = createClient("rediss://default:Ac_gAAIjcDEwYjNlOTRjNTExMDY0NzUwODIzMTAyMDk5MDM0N2Q0ZXAxMA@romantic-spider-53216.upstash.io:6379");

// Log errors
client.on("error", (err) => {
  console.error("Redis error:", err);
});

// Connect to Redis
async function connectRedis() {
  try {
    await client.connect();
    console.log("🚀 Connected to Redis successfully.");
  } catch (err) {
    console.error("💥 Failed to connect to Redis:", err);
  }
}

// Initialize connection
connectRedis();

// Export the connected Redis client
export default client;
