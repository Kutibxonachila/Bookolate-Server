import { Router } from "express";
import { logActivityController } from "../controllers/book.activity.controller.js";

const routerBookActivity = Router();

routerBookActivity.post("/log", logActivityController);

export default routerBookActivity;
