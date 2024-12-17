import { logBookActivity } from "../services/book.activity.service.js";

// Log book activity controller
export const logActivityController = async (req, res) => {
  try {
    const { user_id, book_id, borrow_date, return_date, due_date } = req.body;

    // Validate required fields
    if (!user_id || !book_id || !borrow_date || !due_date) {
      return res.status(400).json({
        message: "User ID, Book ID, Borrow Date, and Due Date are required",
      });
    }

    // Log the activity using the service
    const activity = await logBookActivity(
      user_id,
      book_id,
      borrow_date,
      return_date,
      due_date
    );

    // Respond with success
    res.status(201).json({
      message: "Book activity logged successfully",
      activity,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: error.message,
    });
  }
};
