import { BorrowingActivity, User } from "../models/index.js";
import { parse, isValid } from "date-fns";

export const borrowBook = async (userId, bookId, dueDate) => {
  try {
    // Parse the due_date if provided
    let parsedDueDate;
    if (dueDate) {
      parsedDueDate = parse(dueDate, "dd.MM.yyyy", new Date());
      if (!isValid(parsedDueDate)) {
        throw new Error("Invalid due_date format. Please use DD.MM.YYYY.");
      }
    }

    // Create the borrowing activity
    const borrowingActivity = await BorrowingActivity.create({
      user_id: userId,
      book_id: bookId,
      borrow_date: new Date(),
      due_date: parsedDueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // Fetch the full user details with the borrowing activity
    const borrowingWithUser = await BorrowingActivity.findOne({
      where: { id: borrowingActivity.id },
      include: [
        {
          model: User, // Assuming User is a Sequelize model
          where: { id: userId }, // Ensure the correct user is fetched
          attributes: ["id", "first_name", "last_name", "phone"], // Specify the fields you want from the User table
        },
      ],
    });

    return borrowingWithUser;
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

// Get all borrow records
export const getAllBorrows = async () => {
  try {
    // Fetch all borrowing activities with user details
    const borrows = await BorrowingActivity.findAll({
      include: [
        {
          model: User, // Assuming User is a Sequelize model
          attributes: ["id", "first_name", "last_name", "phone"], // Specify the fields you want from the User table
        },
      ],
    });

    return borrows;
  } catch (error) {
    throw new Error("Error fetching borrowing activities: " + error.message);
  }
};
