import {
  getAllUsers,
  getUserByQuery,
  getUserByUUID,
} from "../services/user.service.js";
import redis from "../config/redis.js"; // Importing Redis

// Get all users with Redis cache
export const fetchAllUsers = async (req, res) => {
  try {
    const cacheKey = "all_users";

    // Check if the data is cached in Redis
    const cachedUsers = await redis.get(cacheKey);

    if (cachedUsers) {
      return res.status(200).json({
        message: "Fetched users from cache",
        data: JSON.parse(cachedUsers),
      });
    }

    // If not cached, fetch from DB
    const users = await getAllUsers();

    // Cache the result for 1 hour (3600 seconds)
    await redis.setex(cacheKey, 3600, JSON.stringify(users));

    res.status(200).json({
      message: "Fetched users from database",
      data: users,
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
      return res.status(200).json({
        message: "Fetched user by query from cache",
        data: JSON.parse(cachedUser),
      });
    }

    // If not cached, fetch from DB
    const users = await getUserByQuery(query);

    // Cache the result for 1 hour (3600 seconds)
    await redis.setex(cacheKey, 3600, JSON.stringify(users));

    res.status(200).json({
      message: "Fetched user by query from database",
      data: users,
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
      return res.status(200).json({
        message: "Fetched user by UUID from cache",
        data: JSON.parse(cachedUser),
      });
    }

    // If not cached, fetch from DB
    const user = await getUserByUUID(id);

    // Cache the result for 1 hour (3600 seconds)
    await redis.setex(cacheKey, 3600, JSON.stringify(user));

    res.status(200).json({
      message: "Fetched user by UUID from database",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ message: "User not found", error: error.message });
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
