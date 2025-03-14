import { Router } from "express";
import {
  AddAdmins,
  GetAdminsById,
  GetAllAdmins,
  LoginAdmins,
  UpdatePermissions,
} from "../controllers/admins.controller.js";
import { authenticateAdmin, checkSuperAdmin } from "../middlewares/auth.middleware.js";

const AdminRouter = Router();

AdminRouter.post("/super/add", authenticateAdmin, checkSuperAdmin, AddAdmins);
AdminRouter.post("/login", LoginAdmins);
AdminRouter.patch("/super/permissions", UpdatePermissions);
AdminRouter.get("/all", GetAllAdmins);
AdminRouter.get("/admin/:id", GetAdminsById);

export default AdminRouter;
