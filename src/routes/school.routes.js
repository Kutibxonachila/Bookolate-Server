import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  CreateSchool,
  DeleteSchool,
  GetSchool,
  UpdateSchool,
} from "../controllers/school.controller.js";

const SchoolRouter = Router();

SchoolRouter.post("/add", authMiddleware, CreateSchool);
SchoolRouter.get("/all", authMiddleware, GetSchool);
SchoolRouter.put("/update/:schoolId", authMiddleware, UpdateSchool);
SchoolRouter.delete("/remove/:schoolId", authMiddleware, DeleteSchool);

export default SchoolRouter;
