import {
  registerUser,
  loginUser,
  forgetPasswordService,
  resetPasswordService,
} from "../services/auth.service.js"; // assuming the service is in authService.js
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.config.js"; // Make sure your secret key is properly configured
import { User } from "../models/index.js";
import bcrypt from 'bcrypt';

// Register user controller
export const registerController = async (req, res) => {
  try {
    const { first_name, last_name, phone, password, gender } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !phone || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate gender field
    if (!["Male", "Female"].includes(gender)) {
      return res.status(400).json({ message: "Invalid gender value" });
    }

    // Check if the phone number already exists
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already in use" });
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
    console.log(req.body);

    const { phone, password } = req.body;

    // Validate required fields
    if (!phone || !password) {
      return res
        .status(400)
        .json({ message: "Phone and password are required" });
    }
    const admins = [
      {
      first_name: "Temur",
      last_name: "Eshtemirov",
      phone: "+998995430660",
      password: await bcrypt.hash("Temur_aDmin", 10),
      },
      {
      first_name: "Dilyor",
      last_name: "Ne'matullayev",
      phone: "+998994356555",
      password: await bcrypt.hash("Dilyor_aDmin", 10),
      },
      {
      first_name: "Oybek",
      last_name: "Samadov",
      phone: "",
      password: await bcrypt.hash("Oybek_aDmin", 10),
      },
    ];

    const admin = admins.find(
      (admin) => admin.phone === phone && bcrypt.compareSync(password, admin.password)
    );

    if (admin) {
      return res.status(200).json({
      message: "Login successful",
      user: {
        first_name: admin.first_name,
        last_name: admin.last_name,
        phone: admin.phone,
        password: password, // Show not hashed password in response
        hashed_password: admin.password, // Show hashed password in response
      },
      });
    }

    // Pass the data as an object to the service function
    const { token, user } = await loginUser({ phone, password });
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(401).json({
      message: error.message,
    });
  }
};
// Forget Password Controller
export const forgetPasswordController = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).send({ message: "Phone number is required" });
    }

    const result = await forgetPasswordService(phone);
    res.status(200).send(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Reset Password Controller
export const resetPasswordController = async (req, res) => {
  try {
    const { phone, newPassword } = req.body;

    if (!phone || !newPassword) {
      return res
        .status(400)
        .send({ message: "Phone number and new password are required" });
    }

    const result = await resetPasswordService(phone, newPassword);
    res.status(200).send(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};
