import { Router } from "express";
import {
  getBookAnalytics,
  updateBookAnalytics,
} from "../services/book.activity.analytic.service";

const routerBookActivityAnalytics = Router();

routerBookActivityAnalytics.put("/update", updateBookAnalytics);
routerBookActivityAnalytics.get("/get", getBookAnalytics);

export default routerBookActivityAnalytics;
