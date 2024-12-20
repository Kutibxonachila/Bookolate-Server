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
  if (book.loaned_date) {
    // Set book on loan
    book.book_status = "On Loan";
  } else {
    // Otherwise, set book status to "Available"
    book.book_status = "Available";
  }

  // If the book is overdue and not returned, change the status
  const overdueBooks = await book.getBorrowingActivities();
  overdueBooks.forEach((activity) => {
    if (!activity.return_date && activity.due_date < new Date()) {
      book.book_status = "Not Returned";
    }
  });

  // Adjust the available count based on the loaned books
  const borrowedCount = await book.getBorrowingActivities();
  book.available = book.total_books - borrowedCount.length;

  // Update missing_books based on overdue counts
  const missingCount = borrowedCount.filter(
    (activity) => !activity.returned_date && activity.due_date < new Date()
  );

  book.missing_books = missingCount.length;

  // Update readed_count if necessary
  book.readed_count = borrowedCount.length;
});




export default Book;
