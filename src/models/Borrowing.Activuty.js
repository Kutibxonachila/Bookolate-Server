import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const BorrowingActivity = sequelize.define("borrowing_activity", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // Sequelize will automatically generate UUIDv4
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID, // Use UUID, not UUIDV4
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  book_id: {
    type: DataTypes.UUID, // Use UUID, not UUIDV4
    allowNull: false,
    references: {
      model: "Book",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  borrow_date: {
    type: DataTypes.DATE(),
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE(),
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE(),
    allowNull: true,
  },
  status: {
    type: DataTypes.VIRTUAL,
    get() {
      if (!return_date) {
        return "Not Returned";
      } else if (return_date <= due_date) {
        return "On Time";
      } else {
        return "Overdue";
      }
    },
  },
});

export default BorrowingActivity;
