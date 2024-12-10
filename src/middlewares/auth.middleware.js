import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.config.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  // Check if token is provided
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }

  // Split token to get the Bearer token
  const bearerToken = token.split(" ")[1];

  if (!bearerToken) {
    return res
      .status(403)
      .json({ success: false, message: "Token format is incorrect" });
  }

  // Verify the token
  jwt.verify(bearerToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // If valid, attach the decoded information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  });
};
