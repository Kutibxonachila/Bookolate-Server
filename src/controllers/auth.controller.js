import { registerUser, loginUser } from "../services/auth.service.js"; // assuming the service is in authService.js

// Register user controller
export const registerController = async (req, res) => {
  try {
    const { first_name, last_name, phone, password, gender } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !phone || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await registerUser(
      first_name,
      last_name,
      phone,
      password,
      gender
    );
    res.status(201).json({
      message: "User registered successfully",
      user,
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
