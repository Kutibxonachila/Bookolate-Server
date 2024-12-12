import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.config.js";

export const registerUser = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ email, password: hashedPassword });
  } catch (error) {
    throw new Error("Error registering user: " + error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return { token, user };
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
};
