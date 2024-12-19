import { Router } from "express";
import {
  getBookAnalyticsController,
  updateBookAnalyticsController,
} from "../controllers/book.activity.analytics.controller.js";

const routerBookActivityAnalytics = Router();

routerBookActivityAnalytics.put("/update", updateBookAnalyticsController);
routerBookActivityAnalytics.get("/get", getBookAnalyticsController);

export default routerBookActivityAnalytics;
