import {
  DeleteAllUser,
  deleteUserByUUID,
  getAllUser,
  getUserByQuery,
  getUserByUUID,
  UpdateUser,
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
    console.log("Fetching user for ID:", id);

    // Check Redis cache
    const cacheKey = `user_${id}`;
    const cachedUser = await redis.get(cacheKey);

    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      return res.status(200).json({
        message: "Fetched user by UUID from cache",
        data: user,
      });
    }

    // Fetch from DB
    const user = await getUserByUUID(id);

    // Cache the result
    await redis.set(cacheKey, JSON.stringify(user.toJSON()));
    await redis.expire(cacheKey, 3600);

    res.status(200).json({
      message: "Fetched user by UUID from database",
      data: user.toJSON(),
    });
  } catch (error) {
    console.error("Error fetching user by UUID:", error.message);
    res.status(500).json({
      message: "Error fetching user by UUID",
      error: error.message,
    });
  }
};



// Update user
export const modifyUser = async (req, res) => {
  try {
    const { userId } = req.params; // Using descriptive parameter name
    const updatedData = req.body;

    if (!userId || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Call the service to update user
    const updatedUser = await UpdateUser(userId, updatedData);

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
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
    const result = await DeleteAllUser();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting all users", error: error.message });
  }
};
