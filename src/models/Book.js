import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import BorrowingActivity from "./Borrowing.Activuty.js";
const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Sequelize will handle UUIDv4 generation
      primaryKey: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publication_year: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keywords: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    book_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Available",
      validate: {
        isIn: [["Available", "On Loan", "Lost", "Damaged"]],
      },
    },
    readed_count: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      defaultValue: 0,
    },
    missing_books: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      defaultValue: 0,
    },
    available: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      validate: {
        min: 1, // This will ensure the total_copies is a positive NUMERIC
      },
    },
    loaned_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    returned_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isbn: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "KitobSpace",
    },
    pages: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isInt: true,
        min: 1,
      },
    },
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt
    tableName: "Book",
    underscored: true,
  }
);

Book.addHook("beforeSave", async (book, options) => {
  try {
    if (book.loaned_date) {
      // Set book on loan
      book.book_status = "On Loan";
    } else {
      // Otherwise, set book status to "Available"
      book.book_status = "Available";
    }

    // Fetch borrowing activities related to this book
    const borrowingActivities = await BorrowingActivity.findAll({
      where: { book_id: book.id },
    });

    // If the book is overdue and not returned, change the status
    const overdueBooks = borrowingActivities.filter(
      (activity) => !activity.return_date && activity.due_date < new Date()
    );
    if (overdueBooks.length > 0) {
      book.book_status = "Not Returned";
    }

    // Adjust the available count based on the loaned books
    const borrowedCount = borrowingActivities.length;
    book.available = book.total_books - borrowedCount;

    // Update missing_books based on overdue counts
    const missingCount = overdueBooks.length;
    book.missing_books = missingCount;

    // Update readed_count
    book.readed_count = borrowedCount;
  } catch (error) {
    console.error("Error in beforeSave hook:", error);
    throw new Error("Error processing book status.");
  }
});

export default Book;
