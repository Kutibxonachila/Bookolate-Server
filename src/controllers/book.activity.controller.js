import { logBookActivity } from "../services/book.activity.service.js";

// Log book activity controller
export const logActivityController = async (req, res) => {
  try {
    const { user_id, book_id, action } = req.body;

    // Validate required fields
    if (!user_id || !book_id || !action) {
      return res
        .status(400)
        .json({ message: "User ID, Book ID, and Action are required" });
    }

    // Log the activity
    const activity = await logBookActivity(user_id, book_id, action);

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
