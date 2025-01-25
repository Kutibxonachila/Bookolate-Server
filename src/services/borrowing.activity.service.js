import { BorrowingActivity } from "../models/index.js";

export const borrowBook = async (userId, bookId) => {
  try {
    return await BorrowingActivity.create({
      user_id: userId,
      book_id: bookId,
      borrow_date: new Date(),
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Example: 7-day loan
    });
  } catch (error) {
    throw new Error("Error borrowing book: " + error.message);
  }
};


export const returnBook = async (userId, bookId) => {
  try {
    const record = await BorrowingActivity.findOne({
      where: { user_id: userId, book_id: bookId },
    });

    if (!record) throw new Error("Borrow record not found");

    record.return_date = new Date(); // Set return_date to the current date
    await record.save(); // Save the updated record
  } catch (error) {
    throw new Error("Error returning book: " + error.message);
  }
};

