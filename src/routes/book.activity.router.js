import { Router } from "express";
import { logActivityController } from "../controllers/book.activity.controller.js";

const routerBookActivity = Router();

routerBookActivity.post("/log", lo  gActivityController);

export default routerBookActivity;
