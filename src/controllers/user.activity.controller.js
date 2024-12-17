import { borrowBook, returnBook } from "../services/user.activity.service.js";

// Controller to handle borrowing a book
export const borrowBookController = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Validate required fields
    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Book ID are required.",
      });
    }

    // Call the service to borrow the book
    await borrowBook(userId, bookId);

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error borrowing book: ${error.message}`,
    });
  }
};

// Controller to handle returning a book
export const returnBookController = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Validate required fields
    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Book ID are required.",
      });
    }

    // Call the service to return the book
    await returnBook(userId, bookId);

    res.status(200).json({
      success: true,
      message: "Book returned successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error returning book: ${error.message}`,
    });
  }
};
