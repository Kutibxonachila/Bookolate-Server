import { BookActivity } from "../models/index.js";

export const logBookActivity = async (userId, bookId, action) => {
  try {
    return await BookActivity.create({
      user_id: userId,
      book_id: bookId,
      action,
      activity_date: new Date(),
    });
  } catch (error) {
    throw new Error("Error logging book activity: " + error.message);
  }
};
