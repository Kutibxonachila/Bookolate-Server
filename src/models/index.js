import User from "./User.js";
import UserActivity from "./User.Activity.js";
import Book from "./Book.js";

// User and User Activity
User.hasMany(UserActivity, {
  foreignKey: { allowNull: false, name: "user_id" },
});
UserActivation.belongsTo(User, {
  foreignKey: { allowNull: false, name: "user_id" },
});

// Book and User Activity
Book.hasMany(UserActivity, {
  foreignKey: { allowNull: false, name: "book_id" },
});
UserActivity.belongsTo(Book, {
  foreignKey: { allowNull: false, name: "book_id" },
});


export default { Book, User, UserActivity };
