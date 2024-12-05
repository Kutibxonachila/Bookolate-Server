import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

const BookActivity = sequelize.define("book_activity", {
  id: {
    type: DataTypes.UUIDV4(),
    unique: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUIDV4(),
    allowNull: false,
  },
  book_id: {
    type: DataTypes.UUIDV4(),
    allowNull: false,
  },
  borrow_date: {
    type: DataTypes.DATE(),
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE(),
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE(),
    allowNull: false,
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
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default BookActivity;
