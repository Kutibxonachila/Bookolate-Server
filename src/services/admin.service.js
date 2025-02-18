import Admin from "../models/Admins.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/env.config.js";
import { Op } from "sequelize";

export const createAdmin = async (superAdminId, data) => {
  const superAdmin = await Admin.findByPk(superAdminId);

// note validation for superadmin
  // if (!superAdmin || superAdmin.role !== "superadmin") {
  //   throw new Error("Only superadmins can create admins");
  // }
//note validation for superadmin
  // if (Date.role === "superadmin")
  //   throw new Error("Superadmins cannot create other superadmins");

  data.password = await bcrypt.hash(data.password, 10);
  return Admin.create(data);
};

export const loginAdmin = async (phone, password) => {
  const admin = await Admin.findOne({ where: { phone } });
  if (!admin) throw new Error("Admin not found");

  // const isMatch = await bcrypt.compare(password, admin.password);
  // if (!isMatch) throw new Error("Invalid credentials");

  admin.lastLogin = new Date();
  await admin.save();

  const token = jwt.sign({ id: admin.id, role: admin.role }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  return { token, admin };
};

// Superadmins can update admins' permissions
export const updatePermissionsByDetails = async (superAdminId, details, permissions) => {
    const superAdmin = await Admin.findByPk(superAdminId);
    if (!superAdmin || superAdmin.role !== "superadmin") {
        throw new Error("Only superadmins can update permissions.");
    }

    const admin = await Admin.findOne({
        where: {
            [Op.or]: [
                { phone: details.phone },
                { firstName: details.firstName, lastName: details.lastName }
            ]
        }
    });

    if (!admin || admin.role === "superadmin") {
        throw new Error("Superadmins cannot be modified.");
    }

    return admin.update({ permissions });
};

// Get all admins (Superadmins only)
export const getAllAdmins = async (superAdminId) => {
  const superAdmin = await Admin.findByPk(superAdminId);
  if (!superAdmin || superAdmin.role !== "superadmin") {
    throw new Error("Only superadmins can view all admins.");
  }

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
