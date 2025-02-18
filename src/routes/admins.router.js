import { Router } from "express";
import {
  AddAdmins,
  GetAdminsById,
  GetAllAdmins,
  LoginAdmins,
  UpdatePermissions,
} from "../controllers/admins.controller.js";

const AdminRouter = Router();

AdminRouter.post("/super/add", AddAdmins);
AdminRouter.post("/login", LoginAdmins);
AdminRouter.patch("/super/permissions", UpdatePermissions);
AdminRouter.get("/all", GetAllAdmins);
AdminRouter.get("/admin/:id", GetAdminsById);

export default AdminRouter;
