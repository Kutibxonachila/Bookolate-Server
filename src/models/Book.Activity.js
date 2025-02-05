import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const BookActivity = sequelize.define(
  "book_activity",
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
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    book_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Book", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    borrow_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATE,
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
  {
    timestamps: false,
    tableName: "book_activity",
    getterMethods: {
      status() {
        if (!this.return_date) return "Not Returned";
        if (this.return_date <= this.due_date) return "On Time";
        return "Overdue";
      },
    },
  }
);

export default BookActivity;
