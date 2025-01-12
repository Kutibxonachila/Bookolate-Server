import { User } from "../models/index.js";

export const getAllUser = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export const getUserByQuery = async (query) => {
  try {
    const users = await User.findAll({ where: query });
    return users;
  } catch (error) {
    console.error("Service Error:", error.message);
    throw new Error("Error fetching users by query");
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

export const DeleteAllUser = async (Model) => {
  try {
    await Model.destroy({
      where: {},
      truncate: true,
    });

    return { success: true, message: "All data deleted successfully." };
  } catch (error) {
    throw new Error("Error deleting user by UUID: " + error.message);
  }
};
