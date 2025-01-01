import {
  getAllUser,
  getUserByQuery,
  getUserByUUID,
} from "../services/user.service.js";
import redis from "../config/redis.js"; // Importing Redis
import jwt from "jsonwebtoken";
import "dotenv/config";


export const fetchAllUsers = async (req, res) => {
  try {
    const cacheKey = "all_users";

    // Check if the data is cached in Redis
    const cachedUsers = await redis.get(cacheKey);

    if (cachedUsers) {
      const usersWithTokens = JSON.parse(cachedUsers).map((user) => ({
        ...user,
        token: jwt.sign(
          { id: user.id, phone: user.phone },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        ),
      }));

      return res.status(200).json({
        message: "Fetched users from cache",
        data: usersWithTokens,
      });
    }

    // If not cached, fetch from DB
    const users = await getAllUser();

    // Add tokens to each user
    const usersWithTokens = users.map((user) => ({
      ...user,
      token: jwt.sign(
        { id: user.id, phone: user.phone },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      ),
    }));

    // Cache the result with a 1-hour expiration
    await redis.set(cacheKey, JSON.stringify(users));
    await redis.expire(cacheKey, 3600); // Set expiration separately

    res.status(200).json({
      message: "Fetched users from database",
      data: usersWithTokens,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Get user by query with Redis cache
export const fetchUserByQuery = async (req, res) => {
  try {
    const query = req.query;
    const cacheKey = `user_query_${JSON.stringify(query)}`;

    // Check if the data is cached in Redis
    const cachedUser = await redis.get(cacheKey);

    if (cachedUser) {
      const userWithToken = JSON.parse(cachedUser).map((user) => ({
        ...user,
        token: jwt.sign(
          { id: user.id, phone: user.phone },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        ),
      }));

      return res.status(200).json({
        message: "Fetched user by query from cache",
        data: userWithToken,
      });
    }

    // If not cached, fetch from DB
    const users = await getUserByQuery(query);

    const usersWithTokens = users.map((user) => ({
      ...user,
      token: jwt.sign(
        { id: user.id, phone: user.phone },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      ),
    }));

    // Cache the result for 1 hour (3600 seconds)
    await redis.set(cacheKey, JSON.stringify(users));
    await redis.expire(cacheKey, 3600); // Set expiration time separately

    res.status(200).json({
      message: "Fetched user by query from database",
      data: usersWithTokens,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user by query", error: error.message });
  }
};

// Get user by UUID with Redis cache
export const fetchUserByUUID = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `user_${id}`;

    // Check if the data is cached in Redis
    const cachedUser = await redis.get(cacheKey);

    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      const userWithToken = {
        ...user,
        token: jwt.sign(
          { id: user.id, phone: user.phone },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        ),
      };

      return res.status(200).json({
        message: "Fetched user by UUID from cache",
        data: userWithToken,
      });
    }

    // If not cached, fetch from DB
    const user = await getUserByUUID(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userWithToken = {
      ...user,
      token: jwt.sign(
        { id: user.id, phone: user.phone },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      ),
    };

    // Cache the result for 1 hour (3600 seconds)
    await redis.set(cacheKey, JSON.stringify(user));
    await redis.expire(cacheKey, 3600); // Set expiration time separately

    res.status(200).json({
      message: "Fetched user by UUID from database",
      data: userWithToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user by UUID", error: error.message });
  }
};

// Update user
export const modifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const user = await updateUser(id, updatedData);
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Delete user by UUID
export const removeUserByUUID = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUserByUUID(id);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// Delete all users
export const removeAllUsers = async (req, res) => {
  try {
    const result = await deleteAllUsers();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting all users", error: error.message });
  }
};
