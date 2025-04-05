import express from "express";
import {
  fetchAllUsers,
  fetchUserByQuery,
  fetchUserByUUID,
  modifyUser,
  removeUserByUUID,
  removeAllUsers,
  fetchUserByToken,
  fetchProfile,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const routerUser = express.Router();

// Get all users
routerUser.get("/users", fetchAllUsers);

// Get user by query (e.g., ?name=John)
routerUser.get("/users", fetchUserByQuery);

// Get user by UUID
routerUser.get("/users/:id", fetchUserByUUID);

// Get user by token
routerUser.get("/users/token", fetchUserByToken);

// GET user profile by UUID
routerUser.get("/profile", verifyToken, fetchProfile);

// Update user
routerUser.patch("/users/:userId", modifyUser);

routerUser.put("/users/:userId", modifyUser);

// Delete user by UUID
routerUser.delete("/users/:id", removeUserByUUID);

// Delete all users
routerUser.delete("/delete", removeAllUsers);

export default routerUser;

/*// { // "name":"1School", eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmNDlmMmM3LWQxMjgtNDc3MC05OWRiLTc1MGUyNGRjYmIxOSIsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzQyMjQwMTc3LCJleHAiOjE3NDI4NDQ5Nzd9.Wv6p2m-PgrRyqio9j0dvQxjqxZ9JIpmlFD4h6E4Zytk // "latitude":a3456.653, // "longitude":-4566.6600 // }*/
