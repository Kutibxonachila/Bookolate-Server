import Admin from "../models/Admins.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.config.js";
import { Op } from "sequelize";

export const createAdmin = async (
  firstName,
  lastName,
  phone,
  password,
  role
) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const admin = await Admin.create({
    firstName,
    lastName,
    phone,
    password: hashedPassword,
    role,
  });
  await admin.save();
  return admin;
};

export const loginAdmin = async (phone, password) => {
  try {
    const admin = await Admin.findOne({ where: { phone } });
    if (!admin) throw new Error("Admin not found");

    console.log("🔹 Admin topildi:", admin);
    console.log("🔹 Admin paroli (bazadagi):", admin.password);
    console.log("🔹 Foydalanuvchi kiritgan parol:", password);

    if (!admin.password.startsWith("$2b$")) {
      throw new Error(
        "Invalid stored password format. Try resetting your password."
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("✅ Parol mosligi:", isMatch);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign({ id: admin.id, role: admin.role }, JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    console.log("✅ Token:", token);
    return {
      success: true,
      message: "Admin logged in successfully",
      data: { token, admin },
    };
  } catch (error) {
    console.error("❌ Login Error:", error.message);
    return { success: false, message: error.message, data: {} };
  }
};


// Superadmins can update admins' permissions
export const updatePermissionsByDetails = async (
  superAdminId,
  details,
  permissions
) => {
  const superAdmin = await Admin.findByPk(superAdminId);
  if (!superAdmin || superAdmin.role !== "superadmin") {
    throw new Error("Only superadmins can update permissions.");
  }

  const admin = await Admin.findOne({
    where: {
      [Op.or]: [
        { phone: details.phone },
        { firstName: details.firstName, lastName: details.lastName },
      ],
    },
  });

  if (!admin || admin.role === "superadmin") {
    throw new Error("Superadmins cannot be modified.");
  }

  return admin.update({ permissions });
};

// Get all admins (Superadmins only)
export const getAllAdmins = async () => {
  return Admin.findAll({ where: { role: "admin" } });
};

// Get single admin (Superadmins only)
export const getAdminById = async (superAdminId, adminId) => {
  const superAdmin = await Admin.findByPk(superAdminId);
  if (!superAdmin || superAdmin.role !== "superadmin") {
    throw new Error("Only superadmins can view admin details.");
  }

  return Admin.findByPk(adminId);
};
