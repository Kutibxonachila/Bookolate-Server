import {
  getWeeklyPopularBooks,
  updateWeeklyPopularity,
} from "../services/weekly.popular.book.service.js";

/**
 * Controller to fetch all weekly popular books
 */
export const fetchWeeklyPopularBooks = async (req, res) => {
  try {
    const books = await getWeeklyPopularBooks();
    return res.status(200).json({ success: true, data: books });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch weekly popular books.",
      error: error.message,
    });
  }
};

/**
 * Controller to update the popularity of a specific book
 */
export const incrementWeeklyPopularity = async (req, res) => {
  const { bookId } = req.params;

  if (!bookId) {
    return res
      .status(400)
      .json({ success: false, message: "Book ID is required." });
  }

  try {
    await updateWeeklyPopularity(bookId);
    return res.status(200).json({
      success: true,
      message: `Popularity of book with ID ${bookId} updated successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update weekly popularity for the book.",
      error: error.message,
    });
  }
};
