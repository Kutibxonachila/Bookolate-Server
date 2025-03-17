import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.config.js";
import { Admin } from "../models/index.js";

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

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const authorizeSuperAdmin = (req, res, next) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from header
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.admin = await Admin.findByPk(decoded.id);

    if (!req.admin) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    console.log("Admin object before token creation:", admin);

    next(); // Move to next middleware/controller
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const checkSuperAdmin = (req, res, next) => {
  if (req.admin.role !== "superadmin") {
    return res.status(403).json({
      success: false,
      message: "Forbidden: Only superadmins can perform this action",
    });
  }
  next();
};

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const admin = await Admin.findByPk(decoded.id);

    if (!admin)
      return res.status(403).json({ success: false, message: "Invalid token" });

    req.user = admin;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
