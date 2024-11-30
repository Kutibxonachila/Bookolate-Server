import http from "http";
import { sequelize } from "./config/db.config.js";
import { PORT } from "./config/env.config.js";
import app from "./app.js";

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("💥 Unable to connect to the database:", error);
  }

  // create server and listen
  const server = http.createServer(app);

  server.listen(PORT, (err) => {
    if (err) {
      console.error("💥 Error starting server:", err);
      return;
    }
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

bootstrap();
