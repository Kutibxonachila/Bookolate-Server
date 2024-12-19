import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller.js"; // Assuming the controllers are in auth.controller.js

const routerAuth = express.Router();

// Route for user registration
routerAuth.post("/register", registerController);

// Route for user login
routerAuth.post("/login", loginController);

export default routerAuth;
