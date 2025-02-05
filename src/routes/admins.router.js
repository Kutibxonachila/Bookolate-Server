import { Router } from "express";
import {
  AddAdmins,
  GetAdminsById,
  GetAllAdmins,
  LoginAdmins,
  UpdatePermissions,
} from "../controllers/admins.controller";

const AdminRouter = Router();

AdminRouter.post("/add", AddAdmins);
AdminRouter.post("/login", LoginAdmins);
AdminRouter.patch("/permissions", UpdatePermissions);
AdminRouter.get("/all", GetAllAdmins);
AdminRouter.get("/admin/:id", GetAdminsById);

export default AdminRouter;
