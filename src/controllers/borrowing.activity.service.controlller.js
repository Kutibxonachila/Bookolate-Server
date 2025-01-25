import { borrowBook, returnBook } from "../services/borrowing.activity.service.js";

// Borrow a book
export const borrowBookController = async (req, res) => {
  try {
    const { userId, bookId  } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Book ID are required.",
      });
    }

    await borrowBook(userId, bookId);

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Return a book
export const returnBookController = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Book ID are required.",
      });
    }

    await returnBook(userId, bookId);

    res.status(200).json({
      success: true,
      message: "Book returned successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllBorrowsController = async (req, res) => {
  try {
    const borrows = await getAllBorrows();

    if (!borrows || borrows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No borrow records found.",
      });
    }

    res.status(200).json({
      success: true,
      borrows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};