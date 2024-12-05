import { DataTypes, NOW } from "sequelize";
import { sequelize } from "../config/db.config";

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.UUIDV4(),
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    book_satus: {
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
      allowNull: false,
      defaultValue: 1,
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
      type: DataTypes.TEXT,
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false }
);

// Hook auto update fiealds
Book.addHook("beforeSave", async (book) => {
  if (book.loaned_date) {
    //set book on loan
    book.book_satus = "On Loan";
  } else {
    // otherwise, set book status to "Available"
    book.book_satus = "Available";
  }

  //Calculate 'avaliable' books base on the loaned count (here,assume 1 book per loan)
  const borrowedCount = await book.getBorrowingActivites();
  book.available = book.total_books - borrowedCount.length;

  // For missing_books check if the book is overdue and count them
  const missingCount = borrowedCount.filter(
    (activity) => !activity.returned_date && activity.due_date < new Date()
  );

  book.missing_books = missingCount.length;

  // Update readed count and other necessary fields if required
  book.readed_count = borrowedCount.length;
});

export default Book;
