import { client as twilioClient } from "../config/twilio.config.js";
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.config.js";

const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

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

  try {
    // Find the user by phone
    const user = await User.findOne({
      where: { phone },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Compare the entered plaintext password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        phone: user.phone,
      },
      JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Return user details (without password) and the token
    return {
      token,
      user: {
        id: user.id,
        phone: user.phone,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    };
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
};

// Forget Password Service
export const forgetPasswordService = async (phone) => {
  // Check if the user exists by phone number
  const user = await User.findOne({ where: { phone } });
  if (!user) {
    throw new Error("User with this phone number not found");
  }

  // Optionally, send an SMS confirmation
  try {
    const message = await client.messages.create({
      body: "Your password reset request has been received. Please reset your password.",
      to: phone,
      from: TWILIO_PHONE_NUMBER,
    });
    console.log("SMS sent:", message.sid);
  } catch (error) {
    console.warn("Twilio SMS failed, proceeding without SMS.");
  }

  return { message: "Password reset request acknowledged." };
};

// Reset Password Service
export const resetPasswordService = async (phone, newPassword) => {
  // Find user by phone number
  const user = await User.findOne({ where: { phone } });
  if (!user) {
    throw new Error("User with this phone number not found");
  }

  // Hash the new password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  // Update the user's password
  user.password = hashedPassword;
  await user.save();

  return { message: "Password reset successful" };
};
