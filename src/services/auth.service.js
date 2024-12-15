import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.config.js";

export const registerUser = async (phone, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ phone, password: hashedPassword });
  } catch (error) {
    throw new Error("Error registering user: " + error.message);
  }
};

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
