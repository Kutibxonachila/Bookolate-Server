import {
  getAllUsers,
  getUserByQuery,
  getUserByUUID,
  updateUser,
  deleteUserByUUID,
  deleteAllUsers,
} from "../services/user.service.js";

// Get all users
export const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching all users", error: error.message });
  }
};

// Get user by query
export const fetchUserByQuery = async (req, res) => {
  try {
    const query = req.query;
    const users = await getUserByQuery(query);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user by query", error: error.message });
  }
};

// Get user by UUID
export const fetchUserByUUID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserByUUID(id);
    res.status(200).json(user);
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
