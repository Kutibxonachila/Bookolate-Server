import express from "express";
import {
  fetchAllUsers,
  fetchUserByQuery,
  fetchUserByUUID,
  modifyUser,
  removeUserByUUID,
  removeAllUsers,
} from "../controllers/user.controller.js";

const routerUser = express.Router();

// Get all users
routerUser.get("/users", fetchAllUsers);

// Get user by query (e.g., ?name=John)
routerUser.get("/users", fetchUserByQuery);

// Get user by UUID
routerUser.get("/users/:id", fetchUserByUUID);

// Update user
routerUser.patch("/users/:userId", modifyUser);

routerUser.put("/users/:userId", modifyUser);

// Delete user by UUID
routerUser.delete("/users/:id", removeUserByUUID);

// Delete all users
routerUser.delete("/users", removeAllUsers);

export default routerUser;
