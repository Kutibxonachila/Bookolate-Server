import http from "http";
import { sequelize } from "./config/db.config.js"; // Sequelize config for DB connection
import { PORT } from "./config/env.config.js"; // Port from config file
import createApp from "./app.js"; // Function to create and configure the Express app

async function bootstrap() {
  try {
    // Try to authenticate the DB connection
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("💥 Unable to connect to the database:", error);
    process.exit(1); // Exit the process if DB connection fails
  }

 sequelize
   .sync({ force: false }) // Set force: false to prevent dropping the table
   .then(() => {
     console.log("✅ Database sync completed.");
   })
   .catch((err) => {
     console.error("💥 Error syncing database:", err);
   });

  // Create the Express app instance
  const app = createApp();

  // Create the HTTP server using the Express app
  const server = http.createServer(app);

  // Start the server
  server.listen(PORT, (err) => {
    if (err) {
      console.error("💥 Error starting server:", err);
      return;
    }
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

// Call bootstrap function to initialize the server
bootstrap();
