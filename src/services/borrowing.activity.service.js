import { Book, BorrowingActivity, User } from "../models/index.js";
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

    if (parsedDueDate) {
    }
    const book = await Book.findOne({ where: { id: bookId } });
    if (!book) {
      throw new Error("Book not found");
    }

    const pages = book.pages;
    if (pages >= 10 && pages <= 50) {
      parsedDueDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    } else if (pages > 50 && pages <= 100) {
      parsedDueDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    } else if (pages > 100 && pages <= 150) {
      parsedDueDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    } else if (pages > 150 && pages <= 200) {
      parsedDueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    } else if (pages > 200 && pages <= 250) {
      parsedDueDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
    } else if (pages > 250 && pages <= 300) {
      parsedDueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    } else if (pages > 300) {
      parsedDueDate = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000); // 3 weeks for books with more than 300 pages
    }
    class BorrowingDuration {
      constructor(pages) {
        this.pages = pages;
      }

      calculateDueDate() {
        if (this.pages >= 10 && this.pages <= 50) {
          return new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
        } else if (this.pages > 50 && this.pages <= 100) {
          return new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
        } else if (this.pages > 100 && this.pages <= 150) {
          return new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
        } else if (this.pages > 150 && this.pages <= 200) {
          return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        } else if (this.pages > 200 && this.pages <= 250) {
          return new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
        } else if (this.pages > 250 && this.pages <= 300) {
          return new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
        } else if (this.pages > 300) {
          return new Date(Date.now() + 21 * 24 * 60 * 60 * 1000); // 3 weeks for books with more than 300 pages
        } else {
          throw new Error("Invalid number of pages");
        }
      }
    }

    const borrowingDuration = new BorrowingDuration(book.pages);
    parsedDueDate = borrowingDuration.calculateDueDate();
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
