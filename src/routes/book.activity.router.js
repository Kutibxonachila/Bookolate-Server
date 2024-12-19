import { Router } from "express";
import { logActivityController } from "../controllers/book.activity.controller";

const routerBookActivity = Router();

routerBookActivity.post("/log", logActivityController);

export default routerBookActivity;
