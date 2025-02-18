import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHanlder.js";
import routerAllTimePopularBook from "./routes/alltime.popular.book.router.js";
import routerAuth from "./routes/auth.router.js";
import routerBookActivityAnalytics from "./routes/book.activity.analytics.router.js";
import routerBookActivity from "./routes/book.activity.router.js";
import routerBook from "./routes/book.routes.js";
import routerBorrow from "./routes/borrowing.activity.service.router.js";
import routerSearch from "./routes/search.router.js";
import routerUser from "./routes/user.routes.js";
import routerWeeklyPopular from "./routes/weekly.popular.book.router.js";
import AdminRouter from "./routes/admins.router.js";

const createApp = () => {
  const app = express();

  // Middleware
  app.use(bodyParser.json());
  app.use(morgan("dev"));
  app.use(cors());
  app.use(errorHandler);
  app.use(express.static("public")); // Serves files from the 'public' folder

  // Routes
  app.use("/admin",AdminRouter)
  app.use("/alltime_popular", routerAllTimePopularBook);
  app.use("/auth", routerAuth);
  app.use("/book_analytics", routerBookActivityAnalytics);
  app.use("/book_activity", routerBookActivity);
  app.use("/book", routerBook);
  app.use("/borrowing", routerBorrow);
  app.use("/search", routerSearch);
  app.use("/user", routerUser);
  app.use("/weekly", routerWeeklyPopular);

  app.get("/ping", (req, res) => {
    res.send("pong");
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

  app.get("/", (req, res) => {
    res.send("Welcome!");
  });
  return app; // Return the Express app instance
};

export default createApp;
