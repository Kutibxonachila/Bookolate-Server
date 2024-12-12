import User from "./User.js";
import UserActivity from "./User.Activity.js";
import Book from "./Book.js";
import BookActivity from "./Book.Activity.js";
import AllTimePopular_Book from "./AllTimePopular.Book.js"; // Fixed naming
import BorrowingActivity from "./Borrowing.Activuty.js"; // Fixed typo in file name
import WeeklyPopularBooks from "./Weekly.Popular.Book.js";

// User and User Activity
User.hasMany(UserActivity, {
  foreignKey: { allowNull: false, name: "user_id" },
});
UserActivity.belongsTo(User, {
  foreignKey: { allowNull: false, name: "user_id" },
});

// Book and User Activity
Book.hasMany(UserActivity, {
  foreignKey: { allowNull: false, name: "book_id" },
});
UserActivity.belongsTo(Book, {
  foreignKey: { allowNull: false, name: "book_id" },
});

// User and Book Activity
User.hasMany(BookActivity, {
  foreignKey: { allowNull: false, name: "user_id" },
});
BookActivity.belongsTo(User, {
  foreignKey: { allowNull: false, name: "user_id" },
});

// Book and Book Activity
Book.hasMany(BookActivity, {
  foreignKey: { allowNull: false, name: "book_id" },
});
BookActivity.belongsTo(Book, {
  foreignKey: { allowNull: false, name: "book_id" },
});

// Book and All Time Popular Books
Book.hasMany(AllTimePopular_Book, {
  foreignKey: { allowNull: false, name: "book_id" },
});
AllTimePopular_Book.belongsTo(Book, {
  foreignKey: { allowNull: false, name: "book_id" },
});

// User and Borrowing Activity
User.hasMany(BorrowingActivity, {
  foreignKey: { allowNull: false, name: "user_id" },
});
BorrowingActivity.belongsTo(User, {
  foreignKey: { allowNull: false, name: "user_id" },
});

// Book and Borrowing Activity
Book.hasMany(BorrowingActivity, {
  foreignKey: { allowNull: false, name: "book_id" },
});
BorrowingActivity.belongsTo(Book, {
  foreignKey: { allowNull: false, name: "book_id" },
});

// Book and Weekly Popular Books
Book.hasMany(WeeklyPopularBooks, {
  foreignKey: { allowNull: false, name: "book_id" },
});
WeeklyPopularBooks.belongsTo(Book, {
  foreignKey: { allowNull: false, name: "book_id" },
});

export default {
  Book,
  User,
  UserActivity,
  BookActivity,
  AllTimePopular_Book,
  BorrowingActivity,
  WeeklyPopularBooks,
};
