import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHanlder.js";
import routerAllTimePopularBook from "./routes/alltime.popular.book.router.js";
import routerAuth from "./routes/auth.router.js";
import routerBookActivityAnalytics from "./routes/book.activity.analytics.router.js";
import routerBookActivity from "./routes/book.activity.router.js";
import routerBook from "./routes/book.routes.js";
import routerBorrow from "./routes/borrowing.activity.service.router.js";
import routerSearch from "./routes/search.router.js";
import routerUserBorrow from "./routes/user.activity.router.js";
import routerUser from "./routes/user.routes.js";
import routerWeeklyPopular from "./routes/weekly.popular.book.router.js";

async function app() {
  const app = express();

  // Middleware
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(errorHandler);

  // Routes
  app.use("/alltime_popular", routerAllTimePopularBook);
  app.use("/auth", routerAuth);
  app.use("/book_analytics", routerBookActivityAnalytics);
  app.use("/book_activity", routerBookActivity);
  app.use("/book", routerBook);
  app.use("/borrowing", routerBorrow);
  app.use("/search", routerSearch);
  app.use("/user/activity",routerUserBorrow);
  app.use("/user",routerUser);
  app.use("/weekly",routerWeeklyPopular)

  //Handle 404 errors
  app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Resource not found" });
  });
}

export default app;
