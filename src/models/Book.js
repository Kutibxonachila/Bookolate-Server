import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
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
      type: DataTypes.TEXT,
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
    },
    keywords: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, // Better for long text
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
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
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
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt
    tableName: "Book",
  }
);

Book.addHook("beforeSave", async (book) => {
  // Set book status based on loaned_date
  if (book.loaned_date) {
    book.book_status = "On Loan"; // Fixed typo from "book_satus" to "book_status"
  } else {
    book.book_status = "Available";
  }

  // Assume there's an association for borrowing activities, e.g., `BorrowingActivity`
  const borrowedActivities = await book.getBorrowingActivities(); // Ensure this association exists
  const borrowedCount = borrowedActivities.length;

  // Calculate available books (total_books must be defined in your model or derived elsewhere)
  if (book.total_books !== undefined) {
    book.available = Math.max(book.total_books - borrowedCount, 0); // Ensure availability can't be negative
  }

  // Calculate missing_books (overdue and not returned)
  const missingCount = borrowedActivities.filter(
    (activity) => !activity.returned_date && activity.due_date < new Date()
  ).length;
  book.missing_books = missingCount;

  // Update read count
  book.readed_count = borrowedCount;
});


export default Book;
