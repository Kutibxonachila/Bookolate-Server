import express from "express";
import {
  registerController,
  loginController,
  forgetPasswordController,
  resetPasswordController,
} from "../controllers/auth.controller.js"; // Assuming the controllers are in auth.controller.js

const routerAuth = express.Router();

// Route for user registration
routerAuth.post("/register", registerController);

// Route for user login
routerAuth.post("/login", loginController);

// Route for user forget password
routerAuth.post("/forget-password", forgetPasswordController);

// ROute for user reset password
routerAuth.post("/reset-password/",   resetPasswordController);
export default routerAuth;
