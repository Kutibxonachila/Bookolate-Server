import { Admin, School } from "../models/index.js";

export const createSchool = async (adminId, name, latitude, longitude) => {
  try {
    // Check if the admin exists
    const admin = await Admin.findByPk(adminId);
    if (!admin) throw new Error("Admin not found");

    // Create school
    const school = await School.create({
      name,
      admin_id: adminId,
      latitude,
      longitude,
    });

    return school;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSchoolByAdmin = async (adminId) => {
  try {
    const school = await School.findOne({ where: { admin_id: adminId } });
    if (!school) throw new Error("School not found");

    return school;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateSchool = async (adminId, schoolId, updates) => {
  try {
    const school = await School.findOne({
      where: { id: schoolId, admin_id: adminId },
    });

    if (!school) throw new Error("School not found or unauthorized");

    await school.update(updates);
    return school;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteSchool = async (adminId, schoolId) => {
  try {
    const school = await School.findOne({
      where: { id: schoolId, admin_id: adminId },
    });

    if (!school) throw new Error("School not found or unauthorized");

    await school.destroy();
    return { message: "School deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};
