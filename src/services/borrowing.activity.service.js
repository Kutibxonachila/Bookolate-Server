import { BorrowingActivity } from "../models/index.js";

export const borrowBook = async (userId, bookId) => {
  try {
    return await BorrowingActivity.create({
      user_id: userId,
      book_id: bookId,
      borrow_date: new Date(),
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
    record.return_date = new Date();
    await record.save();
  } catch (error) {
    throw new Error("Error returning book: " + error.message);
  }
};
