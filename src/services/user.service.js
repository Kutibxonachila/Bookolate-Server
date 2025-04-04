import { User } from "../models/index.js";
import { Op } from "sequelize";
import { JWT_SECRET_KEY } from "../config/env.config.js";


export const getAllUser = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export const getUserByQuery = async (queryParams) => {
  try {
    const whereClause = {};

    // Loop through query parameters to dynamically build the where clause
    for (const [key, value] of Object.entries(queryParams)) {
      if (User.rawAttributes[key]) {
        if (isNaN(value)) {
          // Case-insensitive search for non-numeric fields
          whereClause[key] = { [Op.iLike]: `%${value}%` };
        } else {
          // Exact match for numeric fields
          whereClause[key] = { [Op.eq]: parseInt(value) };
        }
      }
    }

    if (Object.keys(whereClause).length === 0) {
      return [];
    }

    // Fetch users from the database
    const users = await User.findAll({ where: whereClause });

    if (!Array.isArray(users) || users.length === 0) {
      return [];
    }

    return users.map((user) => user.get({ plain: true }));
  } catch (error) {
    console.error("Service Error:", error.message);
    throw new Error("Error fetching users by query: " + error.message);
  }
};


export const getUserByUUID = async (userId) => {
  try {
    console.log("Searching for user with ID:", userId);
    const user = await User.findByPk(userId);

    console.log("Fetched User:", user);

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return user;
  } catch (error) {
    throw new Error("Error fetching users by UUID: " + error.message);
  }
};



export const UpdateUser = async (userId, updatedData) => {
  try {
    // Fetch the user by primary key
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Update the user with the provided data
    await user.update(updatedData);

    return user.toJSON(); // Convert Sequelize instance to plain object
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};


export const getUserByToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (!decoded || !decoded.id) return null;

    const user = await User.findByPk(decoded.id, {
      attributes: [
        "id",
        "first_name",
        "last_name",
        "phone",
        "gender",
        "total_borrowed_books",
        "on_time_returns",
        "overdue_returns",
      ],
    });

    return user;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

export const deleteUserByUUID = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found!");
    }

    if (user.id !== userId)
      throw new Error("You can delete only your own account");

    await user.destroy();
    return { success: true, message: "User deleted successfully." };
  } catch (error) {
    throw new Error("Error deleting user by UUID: " + error.message);
  }
};

export const DeleteAllUser = async () => {
  try {
    await User.destroy({
      where: {}, // Deletes all rows
    });

    return { success: true, message: "All users deleted successfully." };
  } catch (error) {
    throw new Error("Error deleting all users: " + error.message);
  }
};
