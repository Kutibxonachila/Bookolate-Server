import {
  getAllTimePopularBooks,
  incrementPopularity,
} from "../services/alltime.popular.book.service.js";

// Get all-time popular books
export const fetchAllTimePopularBooks = async (req, res) => {
  try {
    const books = await getAllTimePopularBooks();
    res.status(200).json({
      message: "Fetched all-time popular books",
      data: books,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching all-time popular books",
        error: error.message,
      });
  }
};

// Increment book popularity
export const updateBookPopularity = async (req, res) => {
  try {
    const { bookId } = req.params;
    const updatedPopularity = await incrementPopularity(bookId);
    res.status(200).json({
      message: "Book popularity incremented successfully",
      popularity: updatedPopularity,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error incrementing book popularity",
        error: error.message,
      });
  }
};
