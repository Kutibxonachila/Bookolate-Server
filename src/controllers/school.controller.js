import {
  createSchool,
  getSchoolByAdmin,
  updateSchool,
  deleteSchool,
} from "../services/school.service.js";

export const CreateSchool = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;
    const adminId = req.user.id; // Assuming you're using auth middleware

    const school = await createSchool(adminId, name, latitude, longitude);

    return res.status(201).json({
      success: true,
      message: "School created successfully",
      data: school,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const GetSchool = async (req, res) => {
  try {
    const adminId = req.user.id; // Get logged-in admin ID
    const school = await getSchoolByAdmin(adminId);

    return res.status(200).json({
      success: true,
      data: school,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

export const UpdateSchool = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { schoolId } = req.params;
    const updates = req.body;

    const updatedSchool = await updateSchool(adminId, schoolId, updates);

    return res.status(200).json({
      success: true,
      message: "School updated successfully",
      data: updatedSchool,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const DeleteSchool = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { schoolId } = req.params;

    const result = await deleteSchool(adminId, schoolId);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
