import { sequelize } from "../config/db.config.js";
import { BookActivity } from "../models/index.js";

// Log book activity
export const logBookActivity = async (
  userId,
  bookId,
  borrowDate,
  returnDate,
  dueDate
) => {
  try {
    // Create a new record in the book_activity table
    const activity = await BookActivity.create({
      user_id: userId,
      book_id: bookId,
      borrow_date: borrowDate,
      return_date: returnDate,
      due_date: dueDate,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return activity;
  } catch (error) {
    throw new Error("Error logging book activity: " + error.message);
  }
};


export const getBookActivities = async () => {
  try {
    return await BookActivity.findAll({
      attributes: [
        "id",
        "user_id",
        "book_id",
        "borrow_date",
        "return_date",
        "due_date",
        [
          sequelize.literal(`
          CASE 
            WHEN "return_date" IS NULL THEN 'Not Returned'
            WHEN "return_date" <= "due_date" THEN 'On Time'
            ELSE 'Overdue'
          END
        `),
          "status",
        ],
      ],
    });
  } catch (error) {
    console.error("Error fetching book activities:", error);
    throw error;
  }
};