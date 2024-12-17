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
    const hashedPassword = await bcrypt.hash(password, 10);
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
export const loginUser = async (phone, password) => {
  try {
    const user = await User.findOne({ where: { phone } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid phone or password");
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return { token, user };
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
};
