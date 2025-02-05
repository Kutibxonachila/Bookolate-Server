import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import BorrowingActivity from "./Borrowing.Activuty.js";

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.INTEGER,
      allowNull: false,
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
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    missing_books: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    available: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 0,
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
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    is_subject: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    school: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    grade: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      validate: {
        min: 1,
      },
    },
  },
  {
    timestamps: true,
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
