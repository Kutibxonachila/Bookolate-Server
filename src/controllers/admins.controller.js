import {
  createAdmin,
  getAdminById,
  loginAdmin,
  updatePermissionsByDetails,
} from "../services/admin.service";

export const AddAdmins = async (req, res, next) => {
  try {
    const superAdminId = req.user.id;
    const data = req.body;
    const admin = await createAdmin(superAdminId, data);

    console.log(admin);

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: admin,
    });
  } catch (err) {
    next(err);
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const LoginAdmins = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const { token, admin } = await loginAdmin(phone, password);

    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      data: { token, admin },
    });
  } catch (err) {
    next(err);
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdatePermissions = async (req, res, next) => {
  try {
    const superAdminId = req.user.id;
    const { details, permissions } = req.body;
    const admin = await updatePermissionsByDetails(
      superAdminId,
      details,
      permissions
    );

    return res.status(200).json({
      success: true,
      message: "Admin permissions updated successfully",
      data: admin,
    });
  } catch (err) {
    next(err);
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetAllAdmins = async (req, res, next) => {
  try {
    const superAdminId = req.user.id;
    const admins = await getAllAdmins(superAdminId);

    return res.status(200).json({
      success: true,
      message: "Admins retrieved successfully",
      data: admins,
    });
  } catch (err) {
    next(err);
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetAdminsById = async (req, res, next) => {
  try {
    const superAdminId = req.user.id;
    const adminId = req.params.id;
    const admin = await getAdminById(superAdminId, adminId);

    return res.status(200).json({
      success: true,
      message: "Admin retrieved successfully",
      data: admin,
    });
  } catch (err) {
    next(err);
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
