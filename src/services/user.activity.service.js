import BorrowingActivity from "../models/BorrowingActivity.js";
import Book from "../models/index.js";

export const borrowBook = async (userId, bookId) => {
  const book = await Book.findByPk(bookId);
  if (!book || book.available <= 0) {
    throw new Error("Book is not available for borrowing.");
  }

  // Create borrowing activity
  await BorrowingActivity.create({ user_id: userId, book_id: bookId });

  // Decrement book availability
  book.available -= 1;
  await book.save();
};

export const returnBook = async (userId, bookId) => {
  const activity = await BorrowingActivity.findOne({
    where: { user_id: userId, book_id: bookId, returned_date: null },
  });

  if (!activity) {
    throw new Error("No borrowing record found.");
  }

  // Mark book as returned
  activity.returned_date = new Date();
  await activity.save();

  // Increment book availability
  const book = await Book.findByPk(bookId);
  book.available += 1;
  await book.save();
};
