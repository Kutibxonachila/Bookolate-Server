import { UserActivity } from "../models/index.js";

export const logUserActivity = async (userId, action) => {
  try {
    return await UserActivity.create({
      user_id: userId,
      action,
      activity_date: new Date(),
    });
  } catch (error) {
    throw new Error("Error logging user activity: " + error.message);
  }
};
