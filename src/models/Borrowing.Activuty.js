import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const BorrowingActivity = sequelize.define(
  "borrowing_activity",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    book_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Book",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    borrow_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.return_date) {
          return "Not Returned";
        } else if (this.return_date <= this.due_date) {
          return "On Time";
        } else {
          return "Overdue";
        }
      },
    },
  },
  {
    tableName: "borrowing_activity",
  }
);

// Sync without altering schema (this won't attempt to modify the virtual column)
(async () => {
  await BorrowingActivity.sync({ alter: true }); // Don't modify the schema
})();

export default BorrowingActivity;
