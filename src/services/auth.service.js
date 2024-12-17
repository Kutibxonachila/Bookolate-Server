import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.config.js";

// Register user service
export const registerUser = async (
  firstName,
  lastName,
  phone,
  password,
  gender
) => {
  try {
     const saltRounds = 10;
     const hashedPassword = await bcrypt.hash(password, saltRounds);

    return await User.create({
      first_name: firstName,
      last_name: lastName,
      phone,
      password: hashedPassword,
      gender,
      total_borrowed_books: 0, // Default value
      on_time_returns: 0, // Default value
      overdue_returns: 0, // Default value
    });
  } catch (error) {
    throw new Error("Error registering user: " + error.message);
  }
};

// Login user service
export const loginUser = async (loginData) => {
  const { phone, password } = loginData;

  // Find the user by phone
  const user = await User.findOne({ phone });
  if (!user) {
    throw new Error("User not found");
  }

  // Compare the entered password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Return user details (without password)
  return {
    phone: user.phone,
    first_name: user.first_name,
    last_name: user.last_name,
  };
};
