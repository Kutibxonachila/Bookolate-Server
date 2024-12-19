 import express from "express";
import {
  fetchAllUsers,
  fetchUserByQuery,
  fetchUserByUUID,
  modifyUser,
  removeUserByUUID,
  removeAllUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

// Get all users
router.get("/users", fetchAllUsers);

// Get user by query (e.g., ?name=John)
router.get("/users/query", fetchUserByQuery);

// Get user by UUID
router.get("/users/:id", fetchUserByUUID);

// Update user
router.put("/users/:id", modifyUser);

// Delete user by UUID
router.delete("/users/:id", removeUserByUUID);

// Delete all users
router.delete("/users", removeAllUsers);

export default router;
