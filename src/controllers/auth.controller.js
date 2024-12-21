import { registerUser, loginUser } from "../services/auth.service.js"; // assuming the service is in authService.js
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.config.js"; // Make sure your secret key is properly configured

// Register user controller
export const registerController = async (req, res) => {
  try {
    const { first_name, last_name, phone, password, gender } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !phone || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Register the user
    const user = await registerUser(
      first_name,
      last_name,
      phone,
      password,
      gender
    );

    // Generate a JWT token for the user
    const token = jwt.sign(
      {
        id: user.id, // Include user ID in the payload
        phone: user.phone,
      },
      JWT_SECRET_KEY,
      { expiresIn: "1h" } // Token expiration time
    );

    // Send the response with the token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        password: user.password,
        gender: user.gender,
      },
      token, // Include the token in the response
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Login user controller
export const loginController = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Validate required fields
    if (!phone || !password) {
      return res
        .status(400)
        .json({ message: "Phone and password are required" });
    }

    const { token, user } = await loginUser(phone, password);
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
